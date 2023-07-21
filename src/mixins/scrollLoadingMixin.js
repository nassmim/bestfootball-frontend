// This mixin is for function that enable to load and display data, like an infinite scroll

export default {
    methods: {

        /* Handles the infinite loading component to update the list of videos once the user scrolls down
            Arguments --> the data to update (passed as reference), the size and page params used in the sql request,
            the api function to fetch the data, the state (if a scroll handler is used),
            and the property to use to get the actual data we want once we get the response from the api call
        */
        async loadData(dataToUpdate, size, pageNumber, getDataFunction, state=undefined, dataProperty=undefined) {

            const newData = await this.getNewData(size, pageNumber, getDataFunction, dataProperty)

            // Adds to the list of newData displayed the new ones that needs to be displayed
            dataToUpdate.push(...newData)

            // Indicates to the infinite loading component that either new newData were added or no more newData were found
            if(state) {
                newData.length ? state.loaded() : state.complete()
            }
        },

        // Updates the list of videos to add in the existing list 
        async getNewData(size, pageNumber, getDataFunction, dataProperty) {

            // Gets the user's videos that are not yet displayed
            const startNumber = size * pageNumber,
                endNumber = startNumber + size

            const data = await getDataFunction()
            return dataProperty ? data[dataProperty] : data
        },
    }
}