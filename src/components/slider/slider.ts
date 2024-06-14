import stylesContent from "./slider.scss?inline";

class Slider extends HTMLElement {
  private position: number = 0;
  private isDown: boolean = false;
  private startX: number = 0;
  private cardWidth: number = 192;
  private gap: number = 20;
  private initialTranslateX: number = 0;
  private hasMoved: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  /**
   * Вызывается, когда элемент добавляется в DOM.
   */
  connectedCallback() {
    this.shadowRoot!.querySelector(".Slider__button--left")!.addEventListener(
      "click",
      this.handleSlideLeft.bind(this),
    );

    this.shadowRoot!.querySelector(".Slider__button--right")!.addEventListener(
      "click",
      this.handleSlideRight.bind(this),
    );

    const track = this.shadowRoot!.querySelector(".Slider__track")!;

    track.addEventListener(
      "click",
      this.preventClickPropagation.bind(this),
      true,
    );

    track.addEventListener(
      "mousedown",
      this.handleMouseDown.bind(this) as EventListener,
    );
    this.shadowRoot!.querySelector(
      ".Slider__track-container",
    )!.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this) as EventListener,
    );
    track.addEventListener(
      "mouseup",
      this.handleMouseUp.bind(this) as EventListener,
    );
    track.addEventListener(
      "mousemove",
      this.handleMouseMove.bind(this) as EventListener,
    );

    this.updateButtonVisibility();
    window.addEventListener("resize", this.updateButtonVisibility.bind(this));
  }

  /**
   * Вызывается, когда элемент удаляется из DOM.
   */
  disconnectedCallback() {
    this.shadowRoot!.querySelector(
      ".Slider__button--left",
    )!.removeEventListener("click", this.handleSlideLeft.bind(this));

    this.shadowRoot!.querySelector(
      ".Slider__button--right",
    )!.removeEventListener("click", this.handleSlideRight.bind(this));

    const track = this.shadowRoot!.querySelector(".Slider__track")!;
    track.removeEventListener(
      "mousedown",
      this.handleMouseDown.bind(this) as EventListener,
    );
    track.removeEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this) as EventListener,
    );
    track.removeEventListener(
      "mouseup",
      this.handleMouseUp.bind(this) as EventListener,
    );
    track.removeEventListener(
      "mousemove",
      this.handleMouseMove.bind(this) as EventListener,
    );

    window.removeEventListener(
      "resize",
      this.updateButtonVisibility.bind(this),
    );

    track.removeEventListener(
      "click",
      this.preventClickPropagation.bind(this),
      true,
    );
  }

  /**
   * Обновляет видимость кнопок прокрутки.
   */
  private updateButtonVisibility() {
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    const leftButton = this.shadowRoot!.querySelector(
      ".Slider__button--left",
    ) as HTMLElement;
    const rightButton = this.shadowRoot!.querySelector(
      ".Slider__button--right",
    ) as HTMLElement;

    if (track.scrollWidth <= track.clientWidth) {
      leftButton.style.display = "none";
      rightButton.style.display = "none";
    } else {
      leftButton.style.display = "block";
      rightButton.style.display = "block";
    }
  }

  /**
   * Отменяет событие клика по элементу если быдло перемещение
   */
  private preventClickPropagation(event: Event) {
    if (!this.hasMoved) return;
    console.log("preventClickPropagation");
    event.stopPropagation();
    this.hasMoved = false;
  }

  /**
   * Обрабатывает прокрутку слайдера влево.
   */
  private handleSlideLeft() {
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    this.position = Math.max(this.position - this.cardWidth - this.gap, 0);
    track.style.transform = `translateX(-${this.position}px)`;
  }

  /**
   * Обрабатывает прокрутку слайдера вправо.
   */
  private handleSlideRight() {
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    this.position = Math.min(
      this.position + this.cardWidth + this.gap,
      maxScrollLeft,
    );
    track.style.transform = `translateX(-${this.position}px)`;
  }

  /**
   * Обрабатывает начало перемещения мыши для прокрутки слайдера.
   * @param {MouseEvent} event - Событие мыши.
   */
  private handleMouseDown(event: MouseEvent) {
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    this.isDown = true;
    this.hasMoved = false;
    this.startX = event.pageX;
    this.scrollLeft = track.scrollLeft;

    const transformMatrix = window.getComputedStyle(track).transform;
    if (transformMatrix !== "none") {
      this.initialTranslateX = parseFloat(transformMatrix.split(",")[4]);
    } else {
      this.initialTranslateX = 0;
    }

    track.style.cursor = "grabbing";
    track.classList.add("Slider__track-disable");
  }

  /**
   * Обрабатывает выход мыши за пределы слайдера.
   */
  private handleMouseLeave() {
    if (!this.isDown) return;
    this.isDown = false;
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    track.style.cursor = "grab";
    track.classList.remove("Slider__track-disable");
  }

  /**
   * Обрабатывает окончание перемещения мыши.
   */
  private handleMouseUp() {
    if (!this.isDown) return;
    this.isDown = false;
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    track.style.cursor = "grab";
    track.classList.remove("Slider__track-disable");
  }

  /**
   * Обрабатывает перемещение мыши для прокрутки слайдера.
   * @param {MouseEvent} event - Событие мыши.
   */
  private handleMouseMove(event: MouseEvent) {
    if (!this.isDown) return;

    event.preventDefault();
    const track = this.shadowRoot!.querySelector(
      ".Slider__track",
    ) as HTMLElement;
    const x = event.pageX;
    const walk = x - this.startX;

    if (Math.abs(walk) > 5) {
      this.hasMoved = true;
    }

    const maxScrollLeft = -1 * (track.scrollWidth - track.clientWidth);
    let result =
      this.initialTranslateX + walk > 0 ? 0 : this.initialTranslateX + walk;

    result = result >= maxScrollLeft ? result : maxScrollLeft;

    // Перемещение с использованием transform
    track.style.transform = `translateX(${result}px)`;
  }

  /**
   * Рендерит содержимое слайдера.
   */
  private render() {
    this.shadowRoot!.innerHTML = `
    <style>
      ${stylesContent}
    </style>
    <div class="Slider">
      <button class="Slider__button Slider__button--left">&#9664;</button>
      <div class="Slider__track-container">
        <div class="Slider__track">
          <slot></slot>
        </div>
      </div>
      <button class="Slider__button Slider__button--right">&#9654;</button>
    </div>
    `;
  }
}

customElements.define("my-slider", Slider);
export default Slider;
