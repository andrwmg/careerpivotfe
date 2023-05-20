import moment from 'moment'

const formatDate = (createdAt) => {
    const diffInMillis = moment().diff(moment(createdAt))

    if (diffInMillis < 60000) {
        const diffInSeconds = Math.floor(moment.duration(diffInMillis).asSeconds())
        return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
    } else if (diffInMillis < 3600000) {
        const diffInMinutes = Math.floor(moment.duration(diffInMillis).asMinutes())
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    } else if (diffInMillis < 86400000) {
        const diffInHours = Math.floor(moment.duration(diffInMillis).asHours())
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
        const diffInDays = Math.floor(moment.duration(diffInMillis).asDays())
        if (diffInDays > 30) {
            return '30+ days ago'
        } else {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
        }
    }
}

export default formatDate