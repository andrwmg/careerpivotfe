import moment from 'moment'

const mobileDate = (createdAt) => {
    const diffInMillis = moment().diff(moment(createdAt))

    if (diffInMillis < 60000) {
        const diffInSeconds = Math.floor(moment.duration(diffInMillis).asSeconds())
        return `${diffInSeconds}s`
    } else if (diffInMillis < 3600000) {
        const diffInMinutes = Math.floor(moment.duration(diffInMillis).asMinutes())
        return `${diffInMinutes}m`
    } else if (diffInMillis < 86400000) {
        const diffInHours = Math.floor(moment.duration(diffInMillis).asHours())
        return `${diffInHours}h`
    } else {
        const diffInDays = Math.floor(moment.duration(diffInMillis).asDays())
        if (diffInDays > 30) {
            return '30d+'
        } else {
            return `${diffInDays}d`
        }
    }
}

export default mobileDate