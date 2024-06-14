import { AdData } from "../../servises/tizer.service";
import stylesContent from "./card.scss?inline";

class Card extends HTMLElement {
  // @ts-ignore ToDo - оставили для потенциального масштабирования
  private tooltipVisible: boolean = false;

  constructor(private param: AdData) {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  /**
   * Вызывается, когда элемент добавляется в DOM.
   */
  public connectedCallback() {
    this.shadowRoot!.querySelector(".Card")!.addEventListener(
      "click",
      this.handleClick.bind(this),
    );

    this.shadowRoot!.querySelector("[data-open]")!.addEventListener(
      "click",
      this.openTooltip.bind(this),
    );

    this.shadowRoot!.querySelector("[data-close]")!.addEventListener(
      "click",
      this.closeTooltip.bind(this),
    );
  }

  /**
   * Вызывается, когда элемент удаляется из DOM.
   */
  disconnectedCallback() {
    this.shadowRoot!.querySelector(".Card")!.removeEventListener(
      "click",
      this.handleClick.bind(this),
    );

    this.shadowRoot!.querySelector("[data-open]")!.removeEventListener(
      "click",
      this.openTooltip.bind(this),
    );

    this.shadowRoot!.querySelector("[data-close]")!.removeEventListener(
      "click",
      this.closeTooltip.bind(this),
    );
  }

  /**
   * Обрабатывает клик по карточке.
   * Открывает ссылку в новом окне
   * @param {Event} event - Событие клика.
   */
  private handleClick(event: Event) {
    if (
      !(event.target as HTMLElement).closest(
        "[data-open], [data-adv], [data-tooltip]",
      )
    ) {
      window.open(this.param.url, "_blank");
    }
  }

  /**
   * Открывает тултип.
   * @param {Event} event - Событие клика.
   */
  private openTooltip(event: Event) {
    event.stopPropagation();
    this.shadowRoot!.querySelector(".Card__tooltip")!.classList.add(
      "Card__tooltip--active",
    );
    this.tooltipVisible = true;
  }

  /**
   * Закрывает тултип.
   * @param {Event} event - Событие клика.
   */
  private closeTooltip(event: Event) {
    event.stopPropagation();
    this.shadowRoot!.querySelector(".Card__tooltip")!.classList.remove(
      "Card__tooltip--active",
    );
    this.tooltipVisible = false;
  }

  /**
   * Рендерит содержимое карточки.
   */
  private render() {
    const { title, img, official_name, inn, erid } = this.param;

    this.shadowRoot!.innerHTML = `
    <style>
      ${stylesContent}
    </style>
    <div class="Card">
      <img src="${img}" class="Card__image"/>
      <div class="Card__tooltipIcon" data-open>
        <span>...</span>
      </div>
      <div class="Card__tooltip" data-tooltip>
        <p>Рекламодатель: ${official_name}<br/>
          ИНН: ${inn}<br/> 
          ERID: ${erid}
        </p>
        <div class="Card__tooltipCloseIcon" data-close>
          <svg fill="none" height="12px" viewBox="0 0 24 24" width="12px" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#9ca19d"/>
          </svg>
        </div>
      </div>
      <div class="Card__advTitle" data-adv>Реклама</div>
      <div class="Card__content">
        <span>${title}</span>
      </div>
    </div>
  `;
  }
}

customElements.define("my-card", Card);
export default Card;
