$(() => {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var name = $("#updatename").val();
    var email = $("#updateemail").val();
    if (!validateEmail(email)) {
      alert("invalid email");
      return;
    }
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users/" + id,
      data: { name, email },
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
    "https://jsonplaceholder.typicode.com/users/" + id,
    function (response) {
      $("#updateId").val(response.id);
      $("#updatename").val(response.name);
      $("#updateemail").val(response.email);
      $("#updateModal").modal("show");
    }
  );
}
function addRecipe() {
  var name = $("#name").val();
  var email = $("#email").val();
  if (!validateEmail(email)) {
    alert("invalid email");
    return;
  }

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "POST",
    data: { name, email },
    success: function (response) {
      console.log(response);
      $("#name").val("");
      $("#email").val("");
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
    url: "https://jsonplaceholder.typicode.com/users/" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    },
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
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
          `<div class="recipe" data-id="${rec.id}"><h3>${rec.name}</h3><p><button class="btn ml-1 btn-danger btn-sm float-right btn-del">delete</button><button id="war" class="btn btn-warning btn-sm float-right btn-del">Edit</button>${rec.email}</p></div>`
        );
      }
    },
  });
}
function validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([com]{3})$/;

  if (reg.test(emailField) == false) {
    return false;
  }
  return true;
}
