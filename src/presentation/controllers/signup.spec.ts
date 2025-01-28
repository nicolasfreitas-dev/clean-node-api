import { SignUpController } from "./signup";
import { MissingParamError } from "../errors/missing-param-error"

const makeSut = (): SignUpController => {
    return new SignUpController();
}

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                email: "any@mail.com",
                password: "123456",
                passwordConfirmation: "123456"
            }
        }

        const httpResponse = sut.handle(httpRequest);   

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("name"));
    })
})

describe("SignUp Controller", () => {
    test("Should return 400 if no email is provided", () => {
        const sut = makeSut();

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
    });
});

describe("SignUp Controller", () => {
    test("Should return 400 if no password is provided", () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any@mail.com",
                passwordConfirmation: "123456",
            },
        };

        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("password"));
    });
});

describe("SignUp Controller", () => {
    test("Should return 400 if no password confirmation is provided", () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: "any_name",
                email: "any@mail.com",
                password: "123456",
            },
        };

        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"));
    });
});