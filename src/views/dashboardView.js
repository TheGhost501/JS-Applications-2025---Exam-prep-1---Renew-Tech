import { navigation } from "../navigaton/navigation.js";
import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { api } from "../api/api.js";

const solutionCard = (solution) => html`
          <div class="solution">
            <img src="${solution.imageUrl}" alt="${solution.type}" />
            <div class="solution-info">
              <h3 class="type">${solution.type}</h3>
              <p class="description">
                ${solution.description}.
              </p>
              <a class="details-btn" href="/solutions/${solution._id}">Learn More</a>
            </div>
          </div>`;

const dashnoardTemplate = (solutions) => html`
${solutions.length > 0 ?
        html`  
        <h2>Solutions</h2>
        <section id="solutions">
        ${solutions.map(solutionCard)}
        </section>`
        : html` <h2 id="no-solution">No Solutions Added.</h2>`}
`;

export async function showDashoboard() {
const main = document.querySelector('main');
navigation().update();

try {
    const solutions = await api.get('/data/solutions?sortBy=_createdOn%20desc');
    render(dashnoardTemplate(solutions), main);
} catch (err) {
    window.alert(err.message);
}
}
