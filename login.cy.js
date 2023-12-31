describe("Тестирование формы и пароля", function () {
	it("позитивный кейс авторизации", function () {
		cy.visit("https://login.qa.studio/")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#mail").type("german@dolnikov.ru")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#pass").type("iLoveqastudio1")
		cy.get("#loginButton").should("be.enabled")
		cy.get("#loginButton").click()
		cy.get("#messageHeader").should("be.visible")
		cy.get("#messageHeader").contains("Авторизация прошла успешно")
		cy.get("#exitMessageButton > .exitIcon").should("be.visible")
	})


	it("проверка логики восстановления пароля", function () {
		cy.visit("https://login.qa.studio/")
		cy.get("#forgotEmailButton").click()
		cy.get("#forgotForm > .header").should("be.visible")
		cy.get("#forgotForm > .header").contains("Восстановите пароль")
		cy.get("#mailForgot").should("have.attr", "placeholder", "E-mail")
		cy.get("#mailForgot").type("mityukov@qa.studio")
		cy.get("#restoreEmailButton").should("be.enabled")
		cy.get("#restoreEmailButton").contains("Отправить код")
		cy.get("#exitRestoreButton > .exitIcon").should("be.visible")
		cy.get("#restoreEmailButton").click()
		cy.get("#exitMessageButton > .exitIcon").should("be.visible")
		cy.get("#messageHeader").should("be.visible")
		cy.get("#messageHeader").contains("Успешно отправили пароль на e-mail")
	})

	it("негативный кейс авторизации, правильный логин - неправильный пароль", function () {
		cy.visit("https://login.qa.studio/")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#mail").type("german@dolnikov.ru")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#pass").type("asdasd")
		cy.get("#loginButton").should("be.enabled")
		cy.get("#loginButton").click()
		cy.get("#messageHeader").should("be.visible")
		cy.get("#messageHeader").contains("Такого логина или пароля нет")
		cy.get("#exitMessageButton > .exitIcon").should("be.visible")
	})

	it("негативный кейс авторизации, неправильный логин - правильный пароль", function () {
		cy.visit("https://login.qa.studio/")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#mail").type("alexander@mityukov.ru")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#pass").type("iLoveqastudio1")
		cy.get("#loginButton").should("be.enabled")
		cy.get("#loginButton").click()
		cy.get("#messageHeader").should("be.visible")
		cy.get("#messageHeader").contains("Такого логина или пароля нет")
		cy.get("#exitMessageButton > .exitIcon").should("be.visible")
	})

	it("негативный кейс валидации", function () {
		cy.visit("https://login.qa.studio/")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#mail").type("germandolnikov.ru")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#pass").type("iLoveqastudio1")
		cy.get("#loginButton").should("be.enabled")
		cy.get("#loginButton").click()
		cy.get("#messageHeader").should("be.visible")
		cy.get("#messageHeader").contains("Нужно исправить проблему валидации")
		cy.get("#exitMessageButton > .exitIcon").should("be.visible")
	})

	it("проверка на приведение к строчным буквам в логине", function () {
		cy.visit("https://login.qa.studio/")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#mail").type("GerMan@Dolnikov.ru")
		cy.get("#loginButton").should("be.disabled")
		cy.get("#pass").type("iLoveqastudio1")
		cy.get("#loginButton").should("be.enabled")
		cy.get("#loginButton").click()
		cy.get("#messageHeader").should("be.visible")
		cy.get("#messageHeader").contains("Авторизация прошла успешно")
		cy.get("#exitMessageButton > .exitIcon").should("be.visible")
	})
})

describe("Покупка нового аватара для своего тренера", function () {
	it("покупка аватара", function () {
		cy.visit("https://pokemonbattle.me/")
		cy.get(":nth-child(1) > .auth__input").should("have.attr", "type", "email")
		cy.get("#password").should("have.attr", "type", "password")
		cy.get(".auth__button").should("be.enabled")
		cy.get(".auth__button").contains("Войти")
		cy.get(":nth-child(1) > .auth__input").type("flywerk@yandex.ru")
		cy.get("#password").type("TrenerMurchalok1337")
		cy.get(".auth__button").click()
		cy.get('.header__btns > [href="/shop"]').contains("Магазин")
		cy.get('.header__btns > [href="/shop"]').click()
		cy.get(".shop__list > li").not(".feature-empty").children(".shop__button").eq(0).click()
		cy.get('.pay__select-block').should("be.visible")
		cy.get('.pay__payform-v2').should("be.visible")
		cy.get('.pay__pay-header-v2').should("be.visible")
		cy.get('.pay__pay-header-v2').contains("Карта")
		cy.get(".pay__payform-v2 > :nth-child(2) > .pay_base-input-v2").should("have.attr","placeholder","0000 0000 0000 0000")
		cy.get(':nth-child(1) > .pay_base-input-v2').should("have.attr","placeholder","00/00")
		cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').should("have.attr","placeholder","000")
		cy.get('.pay__input-box-last-of > .pay_base-input-v2').should("have.attr","placeholder","GERMAN DOLNIKOV")
		cy.get(".pay__payform-v2 > :nth-child(2) > .pay_base-input-v2").type("4111 1111 1111 1111")
		cy.get(':nth-child(1) > .pay_base-input-v2').type("12/24")
		cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type("125")
		cy.get('.pay__input-box-last-of > .pay_base-input-v2').type("Alexander Mityukov")
		cy.get('.pay-btn').should("be.enabled")
		cy.get('.pay-btn').contains("Оплатить")
		cy.get('.pay-btn').click()
		cy.get('.pay__select-block').should("be.visible")
		cy.get('.payment__fielheader').should("be.visible")
		cy.get('.payment__fielheader').contains("Подтверждение покупки")
		cy.get('#cardnumber').should("have.attr","placeholder","00000")
		cy.get('#cardnumber').type("56456")
		cy.get('.payment__submit-button').should("be.enabled")
		cy.get('.payment__submit-button').contains("Отправить")
		cy.get('.payment__submit-button').click()
		cy.get('.pay__select-block').should("be.visible")
		cy.get('.payment__padding').should("be.visible")
		cy.get('.payment__success1').should("be.visible")
		cy.get('.payment__font-for-success').contains("Покупка прошла успешно")
		cy.get('.payment__adv').should("be.visible")
		cy.get('.payment__adv').contains("Вернуться в магазин")
		cy.wait(5000)
		cy.get('.payment__adv').click()
	})
})


