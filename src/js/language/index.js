// import { langList } from "./langList.js";
import { slider } from "../index.js";


const buttonRu = document.querySelectorAll(".language__button--ru");
const buttonEng = document.querySelectorAll(".language__button--eng");

let currentLanguage = localStorage.getItem("language") || window.location.hash.substring(1) || window.navigator.language.substring(0, 2) || "en";



function changeLanguage(lang) {
	const obsorver = new IntersectionObserver((entries) => {
		entries.forEach((item) => {
			if (item.isIntersecting) {
				fetch(`https://thankful-oasis-65e3d37d24.strapiapp.com/api/${item.target.dataset.language}?populate=*&locale=${lang}`)
					.then((res) => {
						return res.json();
					}).then(({ data }) => {
						switch (item.target.dataset.language) {

							case "header":

								item.target.querySelector(".nav__list").innerHTML = ""

								data.links.forEach((link) => {

									item.target.querySelector(".nav__list").innerHTML += `
								<li class="nav__item" data-nav-item><a href="${link.link}" class="nav__link link title" data-lang="header-home">${link.text}</a></li>`
								});


								break;

							case "hero":

								item.target.querySelector(".hero__name").innerHTML = data.name;
								item.target.querySelector(".hero__lastname").innerHTML = data.lastname;
								item.target.querySelector(".hero__descr").innerHTML = data.description;
								item.target.querySelector(".hero__img").src = data.img_mobile.url;
								item.target.querySelector(".hero__picture source").srcset = data.img_desctop.url;


								break;

							case "about":
								item.target.querySelector(".about__title").innerHTML = data.title;
								item.target.querySelector(".about__text").innerHTML = data.text;

								break;

							case "skills":

								item.target.innerHTML = ""

								data.forEach((items) => {

									item.target.innerHTML += `
									<li class="skills__item">
										<img class="skills__img" src="${items.img.url}" alt="">
										<h3 class="skills__item-title">${items.title}</h3>
										<svg class="skills__rating" data-rating="${items.rating}"width="168" height="21" viewBox="0 0 168 21" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M12.8285 3.02015C13.1786 2.223 14.3096 2.223 14.6597 3.02015L16.4083 7.00141C16.5678 7.36469 16.9271 7.59928 17.3239 7.59928L22.1694 7.59928C23.2087 7.59928 23.5583 8.98807 22.6428 9.48011L19.2933 11.2804C18.8339 11.5273 18.6414 12.0858 18.8512 12.5634L20.2397 15.7247C20.622 16.5952 19.6881 17.4578 18.8507 17.0077L14.2175 14.5175C13.9219 14.3586 13.5663 14.3586 13.2707 14.5175L8.63754 17.0077C7.80006 17.4578 6.86618 16.5952 7.24852 15.7247L8.63703 12.5634C8.84676 12.0858 8.65427 11.5273 8.19488 11.2804L4.84538 9.48011C3.92992 8.98807 4.2795 7.59928 5.31881 7.59928L10.1643 7.59928C10.5611 7.59928 10.9203 7.36469 11.0799 7.00141L12.8285 3.02015Z"
												fill="#070707" />
											<path
												d="M47.9254 3.02015C48.2756 2.223 49.4065 2.223 49.7566 3.02015L51.5052 7.00141C51.6648 7.36469 52.024 7.59928 52.4208 7.59928L57.2663 7.59928C58.3056 7.59928 58.6552 8.98807 57.7397 9.48011L54.3902 11.2804C53.9308 11.5273 53.7384 12.0858 53.9481 12.5634L55.3366 15.7247C55.7189 16.5952 54.7851 17.4578 53.9476 17.0077L49.3144 14.5175C49.0188 14.3586 48.6632 14.3586 48.3676 14.5175L43.7345 17.0077C42.897 17.4578 41.9631 16.5952 42.3454 15.7247L43.734 12.5634C43.9437 12.0858 43.7512 11.5273 43.2918 11.2804L39.9423 9.48011C39.0268 8.98807 39.3764 7.59928 40.4157 7.59928L45.2612 7.59928C45.658 7.59928 46.0173 7.36469 46.1768 7.00141L47.9254 3.02015Z"
												fill="#070707" />
											<path
												d="M83.0226 3.02015C83.3727 2.223 84.5036 2.223 84.8538 3.02015L86.6024 7.00141C86.7619 7.36469 87.1212 7.59928 87.518 7.59928L92.3635 7.59928C93.4028 7.59928 93.7524 8.98807 92.8369 9.48011L89.4874 11.2804C89.028 11.5273 88.8355 12.0858 89.0453 12.5634L90.4338 15.7247C90.8161 16.5952 89.8822 17.4578 89.0447 17.0077L84.4116 14.5175C84.116 14.3586 83.7604 14.3586 83.4648 14.5175L78.8316 17.0077C77.9941 17.4578 77.0603 16.5952 77.4426 15.7247L78.8311 12.5634C79.0409 12.0858 78.8484 11.5273 78.389 11.2804L75.0395 9.48011C74.124 8.98807 74.4736 7.59928 75.5129 7.59928L80.3584 7.59928C80.7552 7.59928 81.1144 7.36469 81.274 7.00141L83.0226 3.02015Z"
												fill="#070707" />
											<path
												d="M118.12 3.02015C118.47 2.223 119.601 2.223 119.951 3.02015L121.7 7.00141C121.859 7.36469 122.218 7.59928 122.615 7.59928L127.461 7.59928C128.5 7.59928 128.85 8.98807 127.934 9.48011L124.585 11.2804C124.125 11.5273 123.933 12.0858 124.142 12.5634L125.531 15.7247C125.913 16.5952 124.979 17.4578 124.142 17.0077L119.509 14.5175C119.213 14.3586 118.858 14.3586 118.562 14.5175L113.929 17.0077C113.091 17.4578 112.157 16.5952 112.54 15.7247L113.928 12.5634C114.138 12.0858 113.946 11.5273 113.486 11.2804L110.137 9.48011C109.221 8.98807 109.571 7.59928 110.61 7.59928L115.456 7.59928C115.852 7.59928 116.212 7.36469 116.371 7.00141L118.12 3.02015Z"
												fill="#E5E5E5" />
											<path
												d="M153.217 3.02015C153.567 2.223 154.698 2.223 155.048 3.02015L156.797 7.00141C156.956 7.36469 157.316 7.59928 157.712 7.59928L162.558 7.59928C163.597 7.59928 163.947 8.98807 163.031 9.48011L159.682 11.2804C159.222 11.5273 159.03 12.0858 159.24 12.5634L160.628 15.7247C161.01 16.5952 160.077 17.4578 159.239 17.0077L154.606 14.5175C154.31 14.3586 153.955 14.3586 153.659 14.5175L149.026 17.0077C148.188 17.4578 147.255 16.5952 147.637 15.7247L149.025 12.5634C149.235 12.0858 149.043 11.5273 148.583 11.2804L145.234 9.48011C144.318 8.98807 144.668 7.59928 145.707 7.59928L150.553 7.59928C150.95 7.59928 151.309 7.36469 151.468 7.00141L153.217 3.02015Z"
												fill="#E5E5E5" />
										</svg>

									</li>`
								});
								rating()
								break;

							case "skillhead":
								item.target.querySelector(".skills__title").innerHTML = data.title;
								item.target.querySelector(".skills__text").innerHTML = data.text;
								break;

							case "portfolios":
								item.target.innerHTML = ""
								data?.forEach((portfolio) => {
									console.log(data);


									item.target.innerHTML += `
												<li class="slider__slide portfolio__slide">
									<img class="portfolio__slide-img" src="${portfolio.img.url}" alt="">
									<a class="portfolio__slide-link" data-lang="portfolio-descr1" href="${portfolio.link}">${portfolio.title}</a>
								</li>`
								});

								slider("portfolio");

								break;

							case "portfoliohead":
								item.target.querySelector(".portfolio__title").innerHTML = data.title;
								break;

							case "contact":
								item.target.querySelector(".contacts__title").innerHTML = data.title;
								item.target.querySelector(".contacts__text").innerHTML = data.text;
								item.target.querySelector(".contacts__button").innerHTML = data.buttontext;
								document.querySelector(".footer__text").innerHTML = data.copyright;
								break;

							case "popup":

								item.target.querySelector(".popup__button-close").innerHTML = data.Close;
								item.target.querySelector(".popup__name").innerHTML = data.Name;
								item.target.querySelector(".popup__email").innerHTML = data.Email;
								item.target.querySelector(".popup__phone").innerHTML = data.Phone;
								item.target.querySelector(".form__textarea").placeholder = data.Message;
								item.target.querySelector(".form__button").innerHTML = data.Send;
								break;
						};

					});
				obsorver.unobserve(item.target);
			}
		});
	});

	document.querySelectorAll("[data-language]").forEach((item) => {
		obsorver.observe(item);
	});

};

changeLanguage(currentLanguage);



buttonRu.forEach((button, index) => {
	currentLanguage === "ru" && button.classList.add("language__button_active");
	button.addEventListener("click", () => {
		buttonEng[index].classList.remove("language__button_active");
		button.classList.add("language__button_active");
		localStorage.setItem("language", "ru");
		changeLanguage("ru")
	});
});

buttonEng.forEach((button, index) => {
	currentLanguage === "en" && button.classList.add("language__button_active");
	button.addEventListener("click", () => {
		buttonRu[index].classList.remove("language__button_active");
		button.classList.add("language__button_active");
		localStorage.setItem("language", "en");
		changeLanguage("en")
	});
});



function rating() {
	document.querySelectorAll('[data-rating]').forEach(item => {
		const starValue = item.dataset.rating;
		item.querySelectorAll('path').forEach((path, index) => {
			path.style.fill = index < starValue ? "#070707" : "#e5e5e5";
		})
	})
}