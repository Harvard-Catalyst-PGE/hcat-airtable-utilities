module.exports = {
    PENDING: "Waiting to be picked up for processing.",
    PROCESSING: "Currently in process.",
    COMPLETE: "Processing finished (may contain processing errors: see Conversion history page for details).",
    FAILED: "Processing halted before finish, owing to errors.",
    CANCELLED: "Job was cancelled before finish.",
    TIMEOUT: "The Airtable app has timed out and will stop polling to check copy status. It may still succeed, or fail. Check D2L for more info."
}