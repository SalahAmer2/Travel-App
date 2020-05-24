//Note: We're calculating the time now(today's date), departure date, and return date as the number of milliseconds since 1970/01/01 with getTime()
const timeDiff = (timeNow, timeDepart, timeReturn) => {
    const timeNowDate = new Date(timeNow);
    const timeDepartDate = new Date(timeDepart);
    const timeReturnDate = new Date(timeReturn);

    const timeNowDateInMilliSec = timeNowDate.getTime();
    const timeDepartDateInMilliSec = timeDepartDate.getTime();
    const timeReturnDateInMilliSec = timeReturnDate.getTime();

    const calculateTimeDiff = (timeDepartDateParam, timeNowDateParam) => {
        const timeDiffInMilliSec = timeDepartDateParam - timeNowDateParam;
        const timeDiffInDays = timeDiffInMilliSec / (1000 * 3600 * 24); // milliseconds to seconds then seconds to hours then hours to days

        return timeDiffInDays;
    }

    if (
        timeDepartDateInMilliSec < timeNowDateInMilliSec || //Ensuring that the departure date is greater than or equal to the date today
        timeDepartDateInMilliSec >= timeReturnDateInMilliSec//Ensuring that the departure date is less than and not equal to the return date
    ) {
        return "Error: invalid dates";
    } else {
        return calculateTimeDiff(timeDepartDateInMilliSec, timeNowDateInMilliSec);
    }

}

module.exports = { timeDiff };