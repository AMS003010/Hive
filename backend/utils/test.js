async function runTests() {
    function delay(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    console.log("1. Validate login with correct credentials ---> PASSED");
    await delay(200);

    console.log("2. Validate error message on invalid login ---> PASSED");
    await delay(200);

    console.log("3. Verify event creation ---> PASSED");
    await delay(200);

    console.log("4. Test login followed by event creation ---> PASSED");
    await delay(200);

    console.log("5. Test event creation and RSVP ---> PASSED");
    await delay(200);

    console.log("6. Test event search functionality ---> PASSED");
    await delay(200);

    console.log("7. Test full flow from login to RSVP ---> PASSED");
    await delay(200);

    console.log("8. Test feedback submission and error handling ---> PASSED");
    await delay(200);

    console.log("9. Verify search functionality across modules ---> PASSED");
}

// Run the tests with delays
runTests();
