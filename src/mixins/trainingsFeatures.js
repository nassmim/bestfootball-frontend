// This mixin is for functions related to trainings, especially data fetching

export default {

    methods: {

        /* Gets the data and updates the state if required
        Takes the necessary params for the api request, the api request name, the data to update (argument as a reference),
        the property to get the data from the request response, a boolean indicating if the state must be updated with the data received,
        and the commit mutation to call to update the state
        */
        async getDataUpdateState(data, action, property = undefined, updateState = undefined, stateCommit) {

            // Dispatches the action to get the challenges and updates the videos state
            const response = await action(data).catch(() => { throw new Error() })
            const newData = property ? response.data[property] : response.data

            if (updateState) {
                stateCommit(newData)
            }

            return newData
        },
    }
}