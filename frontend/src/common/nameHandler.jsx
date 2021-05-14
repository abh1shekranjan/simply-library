// A first name or last name should not contain any special character.
const nameRegex = /^[a-zA-Z]+$/

export const isValidNameWeb = (name) => {
    if (name.trim().length) {
        return nameRegex.test(name.trim());
    }
    return true
}
