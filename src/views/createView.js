import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { navigation } from "../navigaton/navigation.js";
import { api } from "../api/api.js";
import { auth } from "../auth/authService.js";
import page from "../../../node_modules/page/page.mjs";

export const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Add Solution</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Add Solution</button>
            </form>
          </div>
        </section>`

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
        await api.authenticatedPost('/data/solutions', { type, imageUrl, description, learnMore });
        page('/solutions');
    } catch (err) {
        window.alert(err.message);
    }

}

export async function showCreate() {
    if(!auth.isAuthenticated()) {
        page('/login');
        return
    }

    const main = document.querySelector('main');
    render(createTemplate(handleSubmit), main);
    navigation().update();
}