const formatCount = (count) => {
    if (count < 1000) {
        return `${count}`
    } else if (count < 1000000) {
        return `${count / 1000}K`
    } else if (count < 1000000000) {
        return `${count / 1000000}M`
    }
}

export default formatCount