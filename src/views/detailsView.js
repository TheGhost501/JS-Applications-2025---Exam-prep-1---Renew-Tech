import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import { navigation } from "../navigaton/navigation.js";
import { api } from "../api/api.js";
import { auth } from "../auth/authService.js";
import page from "../../../node_modules/page/page.mjs";

export const detailsTemplate = (solution, isOwner, likeCount, showLikeBtn, onEdit, onDelete, onLike) => html`
 <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src="${solution.imageUrl}"
              alt="${solution.type}"
            />
            <div>
              <p id="details-type">${solution.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">
                    ${solution.description}
                  </p>
                  <p id="more-info">
                    ${solution.learnMore}
                  </p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${likeCount}</span></h3>

              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
              ${isOwner ? html`   
                <a href="#" id="edit-btn" @click=${onEdit}>Edit</a>
                <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>`
    : showLikeBtn
      ? html`<a href="#" id="like-btn" @click=${onLike}>Like</a>`
      : ""}     
              </div>
            </div>
          </div>
        </section>`

export async function showDetails(ctx) {
  const solutionId = ctx.params.id;
  const main = document.querySelector('main');
  navigation().update();

  try {
    const solution = await api.get(`/data/solutions/${solutionId}`);

    const userId = auth.getUserId();
    const isOwner = userId === solution._ownerId;

    // GET TOTAL LIKE COUNT
    const likeCount = await api.get(
      `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`
    );

    // CHECK IF USER HAS LIKED
    let hasLiked = 1; // default for guests

    if (userId) {
      hasLiked = await api.get(
        `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
      );
    }

    const showLikeBtn = userId && !isOwner && hasLiked === 0;


    const onEdit = (e) => {
      e.preventDefault();
      page(`/edit/${solutionId}`);
    }
    const onDelete = (e) => {
      e.preventDefault();
      const confirm = window.confirm('Are you sure you want to delete this solution>');
      if (confirm) {
        api.authenticatedDelete(`/data/solutions/${solutionId}`);
        page("/solutions");
      }
    }
    const onLike = async (e) => {
      e.preventDefault();
      await api.authenticatedPost(`/data/likes`, { solutionId });
      page(`/solutions/${solutionId}`);
    }
    render(detailsTemplate(solution, isOwner, likeCount, showLikeBtn, onEdit, onDelete, onLike), main);
  } catch (err) {
    window.alert(err.message);
  }
}
