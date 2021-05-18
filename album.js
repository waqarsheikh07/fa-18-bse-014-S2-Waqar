$(() => {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var title = $("#updatetitle").val();

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/albums/" + id,
      data: { title },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://jsonplaceholder.typicode.com/albums/" + id,
    function (response) {
      $("#updateId").val(response.id);
      $("#updatetitle").val(response.title);
      $("#updateemail").val(response.email);
      $("#updateModal").modal("show");
    }
  );
}
function addRecipe() {
  var title = $("#title").val();

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/albums",
    method: "POST",
    data: { title },
    success: function (response) {
      console.log(response);
      $("#title").val("");

      loadRecipies();
      $("#addModal").modal("hide");
    },
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/albums/" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    },
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/albums",
    method: "GET",
    error: function (response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec.id}"><h3> ${rec.id}-> ${rec.title}</h3><p><button class="btn ml-1 btn-danger btn-sm float-right btn-del">delete</button><button id="war" class=" btn btn-warning btn-sm float-right btn-del">Edit</button> </p></div>`
        );
      }
    },
  });
}
