$(function() {

var search_list = $("#user-search-result");
var user_list = $(".chat-group-users.js-add-user");

function appendUserHTML(user) {
   var html = ` <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div> `
    search_list.append(html);
 }
 function appendErrUserHTML() {
    var html = `<li>
                  <div class='listview__element--right-icon'>一致するユーザーはありません</div>
                </li>`
    search_list.append(html);
  }

 function appendUserGroupHTML(id,name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                <input name="group[user_ids][]" type="hidden" value=${id}>
                <p class="chat-group-user__name">${name}</p>
                <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    user_list.append(html);
  }

  $("#user-search-field").keyup(function(e) {
    var input = $("#user-search-field").val();
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserHTML(user);
        });
      }
      else {
        appendErrUserHTML();
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on("click", ".user-search-add", function (e) {
      var id = $(this).attr('data-user-id');
      var name = $(this).attr('data-user-name');
      appendUserGroupHTML(id,name);
      $(this).parent().remove();
  });

  $(document).on("click", ".js-remove-btn", function (e) {
      $(this).parent().remove();
  });
});
