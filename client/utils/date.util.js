export const getCurrentMonthRus = ['_',
        'Январь', "Февраль", "Март",
         "Апрель", "Май", "Июнь",
         "Июль", "Август", "Сентябрь",
         "Октябрь", "Ноябрь", "Декабрь"
    ];
export const getWeekNames = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс'
]
const date = new Date();


export const getLenghMonth =(year, month) => {
    return new Date(year, month , 0).getDate()
};

export const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay() || 7
}

export const fixDay = (day) => {
    if (day <= 9) {
        day = '0'+day
    }
    return day
}

export const fixMonth = (month) => {
    if (month <=9) {
        month = '0'+month
    }
    return month
}


export const currentDate = `${date.getFullYear()}-${fixMonth(+date.getMonth()+1)}-${fixDay(date.getDate())}`;