import { SignUpController } from "./signup";
import { MissingParamError } from "../errors/missing-param-error"
import { InvalidParamError } from "../errors/invalid-param-error";
import { EmailValidator } from "../protocols/emailValidator";

interface SutTypes {
    sut: SignUpController,
    emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }

    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub);

    return {
        sut,
        emailValidatorStub
    }
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                email: "any@mail.com",
                password: "123456",
                passwordConfirmation: "123456"
            }
        }

        const httpResponse = sut.handle(httpRequest);  

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("name"))
    })

    test("Should return 400 if no email is provided", () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                name: "any_name",
                password: "123456",
                passwordConfirmation: "123456",
            },
        };

        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("email"));
    })

    test("Should return 400 if no password is provided", () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any@mail.com",
                passwordConfirmation: "123456",
            },
        };

        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("password"))
    })

    test("Should return 400 if no password confirmation is provided", () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any@mail.com",
                password: "123456",
            },
        };

        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"))
    })

    test("Should return 400 if an invalid email is provided", () => {
        const { sut, emailValidatorStub } = makeSut()

        jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                name: "any_name",
                email: "invalid@mail.com",
                password: "123456",
                passwordConfirmation: "123456",
            },
        };

        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError("email"))
    })
})