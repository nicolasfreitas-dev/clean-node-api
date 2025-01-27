import { SignUpController } from "./signup";
import { MissingParamError } from "../errors/missing-param-error"

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController();

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
        const sut = new SignUpController();

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