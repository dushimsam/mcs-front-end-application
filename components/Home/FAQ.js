export default function FAQ() {
  return (
    <div className="mt-5 container pt-5 pb-5">
      <h3 className="numan text-center">Frequently Asked Questions</h3>
      <div className="mt-5">
        <div id="main">
          <div class="container">
            <div class="accordion" id="faq">
              <div class="card shadow-sm">
                <div class="card-header" id="faqhead1">
                  <a
                    href="#"
                    class="btn btn-header-link"
                    data-toggle="collapse"
                    data-target="#faq1"
                    aria-expanded="true"
                    aria-controls="faq1"
                  >
                    How does it work?
                  </a>
                </div>

                <div
                  id="faq1"
                  class="collapse show"
                  aria-labelledby="faqhead1"
                  data-parent="#faq"
                >
                  <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
              <div class="card shadow-sm">
                <div class="card-header" id="faqhead2">
                  <a
                    href="#"
                    class="btn btn-header-link collapsed"
                    data-toggle="collapse"
                    data-target="#faq2"
                    aria-expanded="true"
                    aria-controls="faq2"
                  >
                    Is it bording?
                  </a>
                </div>

                <div
                  id="faq2"
                  class="collapse"
                  aria-labelledby="faqhead2"
                  data-parent="#faq"
                >
                  <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
              <div class="card shadow-sm">
                <div class="card-header" id="faqhead3">
                  <a
                    href="#"
                    class="btn btn-header-link collapsed"
                    data-toggle="collapse"
                    data-target="#faq3"
                    aria-expanded="true"
                    aria-controls="faq3"
                  >
                    What are the pricing options?
                  </a>
                </div>

                <div
                  id="faq3"
                  class="collapse"
                  aria-labelledby="faqhead3"
                  data-parent="#faq"
                >
                  <div class="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
