let currentYear = new Date().getFullYear();
const Years = [];
for (let j = 0, i = currentYear-18; i >= currentYear - 98; i--,j++) {
    Years.push({
        id : j,
        value : i}
    )
}
export default Years

