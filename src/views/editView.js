import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { navigation } from "../navigaton/navigation.js";
import { api } from "../api/api.js";
import { auth } from "../auth/authService.js";
import page from "../../../node_modules/page/page.mjs";

export const editTemplate = (solution, onSubmit) => html`
<section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form class="edit-form"  @submit=${onSubmit}>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type" .value=${solution.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL" .value=${solution.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                .value= ${solution.description}
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
                .value=${solution.learnMore}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>`


export async function showEdit(ctr) {
    const solutionId = ctr.params.id;
    const main = document.querySelector('main');
    navigation().update();

    try {
        const solution = await api.get(`/data/solutions/${solutionId}`);
        const userId = auth.getUserId();

        async function handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const type = formData.get("type")
            const imageUrl = formData.get("image-url")
            const description = formData.get("description")
            const learnMore = formData.get("more-info")
            if (!type || !imageUrl || !description || !learnMore) {
                window.alert("All fields are required");
                return;
            }
           
            try {
                await api.authenticatedPut(`/data/solutions/${solutionId}`, { type, imageUrl, description, learnMore });
                page(`/solutions/${solutionId}`);
            } catch (error) {
                window.alert(error.message);
            }
        }
        render(editTemplate(solution, handleSubmit), main);
        navigation().update();


    } catch (error) {
        window.alert(error.message);
    }
}


