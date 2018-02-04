var $addBtn = $('#addBtn');
var $clearBtn = $('#clearBtn');
var $filterAll = $('#filterAll');
var $filterDone = $('#filterDone');
var $filterUndone = $('#filterUndone');
var $input = $('#inputText');
var $list = $('#tasklists');
var todoItems = localStorage.getItem('task') || "[]";
todoItems = JSON.parse(todoItems);
var filterBy = 'all';

updateView();

$addBtn.on('click', addTask);
$clearBtn.on('click', clearTask);  
$filterAll.on('click', filterAllTasks);
$filterDone.on('click', filterDoneTasks);
$filterUndone.on('click', filterUndoneTasks);
$list.on('click', function(e) {
  var el = e.target;
  var elp = el.parentNode;
  if (el.nodeName == 'SPAN') {
    //el.className = 'done';
    todoItems[Array.from(elp.parentNode.children).indexOf(elp)].done = true;
  }
  else if (el.nodeName == 'BUTTON') {
    //el.parentNode.remove();
    todoItems.splice(Array.from(elp.parentNode.children).indexOf(elp), 1);
  }
  //localStorage.setItem('task', JSON.stringify(todoItems));
  updateView();
});

function updateView() {
  localStorage.setItem('task', JSON.stringify(todoItems));
  $list.html(todoItems.filter(function(item) {
    if(filterBy === 'all') return true;
    if(filterBy === 'done' && item.done) return true;
    if(filterBy === 'undone' && !item.done) return true;
    return false;
  }).map(function(item) {
    return `<div><span class="${item.done ? 'done' : ''}">${item.label}</span><button>delete</button></div>`;
  }).join(''));
}

function addTask(e) {
  e.preventDefault();

  if($input.val() == '')
    return;

  //$list.append('<div><span>' + $input.val() + '</span><button>delete</button></div>');
  todoItems.push({
    label : $input.val(),
    done  : false,
  }); 

  $input.val('');
  //localStorage.setItem('task', JSON.stringify(todoItems));
  updateView();
  
}

function clearTask() {
  if(confirm('Do you really want to delete all tasks?')) {
    todoItems = [];
    updateView();
    //localStorage.setItem('task', []);
  }
}

function filterAllTasks() {
  //for (var i = 0; i < list.children.length; i++){
  //list.children[i].style.display = 'block';
  //}
  //$list.children().css('display', 'block');
  filterBy = 'all';
  updateView();
}
function filterDoneTasks() {
  //for (var i = 0; i < list.children.length; i++){
  //list.children[i].style.display = 'none';
  //if(list.children[i].children[0].className == 'done')
  //list.children[i].style.display = 'block';
  //else list.children[i].style.display = 'none';
  //}
  //
  //$list.children().each(function() {
  //if(this.children[0].classList.contains('done')) {
  //this.style.display = 'block';
  //} else {
  //this.style.display = 'none';
  //}
  //});
  filterBy = 'done';
  updateView();
}
function filterUndoneTasks() {
  //for (var i = 0; i < list.children.length; i++){
  //list.children[i].style.display = 'none';
  //if(list.children[i].children[0].className == '')
  //list.children[i].style.display = 'block';
  //}
  //$list.children().each(function() {
  //if(!this.children[0].classList.contains('done')) {
  //this.style.display = 'block';
  //} else {
  //this.style.display = 'none';
  //}
  //});
  filterBy = 'undone';
  updateView();
}
