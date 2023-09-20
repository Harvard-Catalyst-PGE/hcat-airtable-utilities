module.exports = {
    settleAllPromises: async function(promises) {
        // Await results from all reconciliations
        let errors = [];
        let successes = [];

        await Promise.allSettled(promises)
            .then((results) => {
                results.forEach(result => {
                    if (result.status === "fulfilled") {
                        successes.push(result.value);
                    } else {
                        errors.push({"reason": result.reason.statusText});
                    }
                });
            })
            .catch((err) => {
                errors.push(err);
            });

        return {
            successes: successes,
            errors: errors,
        }
    }
}