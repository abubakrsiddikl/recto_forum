// load allpost
const loadPost = async (category) => {
  // search query set by ternary oparetor
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category?`?category=${category}` : ""
    }`
  );
  const data = await res.json();
  displayAllPosts(data.posts);
};

const displayAllPosts = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div
      class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
    >
      <div class="indicator">
        <span class="indicator-item badge bg-green-600"></span>
        <div class="avatar">
          <div class="w-24 rounded-xl">
            <img
              src=${post.image}
            />
          </div>
        </div>
      </div>
      <div class="space-y-4 w-full">
        <div class="flex gap-4 *:opacity-60">
          <p>${post.category}</p>
          <p>Author: ${post.author.name}</p>
        </div>
        <h3 class="text-2xl font-bold opacity-70">
          ${post.title}
        </h3>
        <p class="opacity-40">
          ${post.description}
        </p>
        <hr class="border border-dashed border-gray-300" />
        <div
          class="flex justify-between *:font-bold [&amp;>*:not(:last-child)]:opacity-45"
        >
          <div class="flex gap-4">
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
              <p>${post.comment_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-eye" aria-hidden="true"></i>
              <p>${post.view_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
              <i class="fa-regular fa-clock" aria-hidden="true"></i>
              <p>${post.posted_time} Min</p>
            </div>
          </div>
          <div class="opacity-100">
            <button
              id="addToList"
              onclick="markAsRead('${post.description}','${post.view_count}')"
              class="addToList btn btn-circle bg-green-500 btn-sm"
            >
              <i
                class="fa-solid fa-envelope-open text-white"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
        `;
        postContainer.append(div)
  });
};

// latest all post function
const latestAllPost = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPost(data)
};

// latest post display

// markAsRead function
const markAsRead = (description,view_count) => {
    // console.log(description,view_count)
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');
    div.innerHTML = `
     <div
      class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3"
    >
      <div class="lg:w-4/5 w-11/12">
        <p>${description}</p>
      </div>
      <div class="lg:w-1/5 w-4/12 flex justify-end">
        <p><i class="fa-regular fa-eye" aria-hidden="true"></i> ${view_count}</p>
      </div>
    </div>
    `;
    markAsReadContainer.append(div)
    handeleCount();
};

// handele count function
const handeleCount = () => {
    const prveCount = document.getElementById('markAsReadCounter').innerText;
    const convertedCount = parseInt(prveCount);
    const sum = convertedCount + 1;
    document.getElementById('markAsReadCounter').innerText=sum;
};

// call all function
loadPost();
latestAllPost();

const handelSearchByCategorey = () => {
  const searchText = document.getElementById("searchPosts").value;
  loadPost(searchText);
};
