// Unit tests for username validation logic in script.js
// Using Jest for testing

describe('Username Validation', () => {
    // The regex used in the code
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function isValidUsername(username) {
        return regex.test(username);
    }

    test('Valid username: meets all requirements', () => {
        expect(isValidUsername('Testuser1!')).toBe(true);
        expect(isValidUsername('A1@aaaaa')).toBe(true);
        expect(isValidUsername('Password1$')).toBe(true);
    });

    test('Valid username: more examples', () => {
        expect(isValidUsername('Qwerty1!')).toBe(true);
        expect(isValidUsername('HelloWorld2@')).toBe(true);
        expect(isValidUsername('A2$aaaaaa')).toBe(true);
        expect(isValidUsername('Z9!Z9!Z9!')).toBe(true);
    });

    test('Invalid username: less than 8 characters', () => {
        expect(isValidUsername('A1@a')).toBe(false);
    });

    test('Invalid username: missing uppercase', () => {
        expect(isValidUsername('testuser1!')).toBe(false);
    });

    test('Invalid username: missing number', () => {
        expect(isValidUsername('Testuser!')).toBe(false);
    });

    test('Invalid username: missing special character', () => {
        expect(isValidUsername('Testuser1')).toBe(false);
    });

    test('Invalid username: missing all requirements', () => {
        expect(isValidUsername('testuser')).toBe(false);
    });

    test('Invalid username: only lowercase and numbers', () => {
        expect(isValidUsername('abcdefg1')).toBe(false);
    });
    test('Invalid username: only uppercase and special', () => {
        expect(isValidUsername('ABCDEFG!')).toBe(false);
    });
    test('Invalid username: only numbers and special', () => {
        expect(isValidUsername('1234567!')).toBe(false);
    });
    test('Invalid username: contains invalid special character', () => {
        expect(isValidUsername('ValidUser1#')).toBe(false); // # is not allowed
    });
    test('Invalid username: spaces included', () => {
        expect(isValidUsername('Valid User1!')).toBe(false);
    });
    test('Invalid username: too short even if all requirements met', () => {
        expect(isValidUsername('A1@aaaa')).toBe(false); // only 7 chars
    });
});
