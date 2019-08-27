document.addEventListener("DOMContentLoaded", function() {
    boot();
});

async function boot() {
    var store = {};
    await getJsonData('data/search_limits.json').then(function(data) {
        store = JSON.parse(data);
    });

    await getJsonData('data/users.json').then(function(data) {
        var registeredUsers = JSON.parse(data); //registration_date
        registeredUsers.map(function(user) {
            user.registration_date_ts = new Date(user.registration_date).getTime();
        });
        store.registeredUsers = store.searched = registeredUsers;
    });

    store.sliderEarned = runSlider({
        min: store.users.min_points_earned || 0,
        max: store.users.max_points_earned || 500,
        label: 'Кол-во заработанных баллов',
        container: document.getElementById("slidersContainer")
    });
    store.sliderSpent = runSlider({
        min: store.users.min_points_spent || 0,
        max: store.users.max_points_spent || 500,
        label: 'Кол-во потраченных баллов',
        container: document.getElementById("slidersContainer")
    });

    datePointParse(store);
    renderUsersList({
        container: document.getElementById('users_list'),
        store: store,
        fromSearch: false
    })
    document.getElementById('reset_button').onclick = function() {
        store.sliderEarned.reset();
        store.sliderSpent.reset();
        store.from_picker.set({
            select: new Date(store.users.min_registartion_date)
        });

        store.to_picker.set({
            select: new Date(store.users.max_registartion_date)
        });
        document.getElementById('userName').value = '';
        searchUsers(store);
    }

    document.getElementById('search_button').onclick = function() {
        searchUsers(store);
    }

    document.getElementById('filter_field_expand').onclick = function(event) {
    	event.preventDefault();
    	if(document.getElementById('slidersContainer').classList.contains('closed')) document.getElementById('slidersContainer').classList.remove('closed');
    	else document.getElementById('slidersContainer').classList.add('closed');
    	if(this.classList.contains('open')) this.classList.remove('open');
    	else this.classList.add('open');
    }

    document.getElementById('nameFilter').onclick = function(event) {
    	event.preventDefault();
    	store.filtered = store.searched.sort(sortUsers('name'));
    	renderUsersList({
        container: document.getElementById('users_list'),
        store: store,
        fromFilter: true
    	})
    }
    
    document.getElementById('dateFilter').onclick = function(event) {
    	event.preventDefault();
    	store.filtered = store.searched.sort(sortUsers('registration_date_ts'));
    	renderUsersList({
        container: document.getElementById('users_list'),
        store: store,
        fromFilter: true
    	})
    }

    document.getElementById('pointsFilter').onclick = function(event) {
    	event.preventDefault();
    	store.filtered = store.searched.sort(sortUsers('points_earned'));
    	renderUsersList({
        container: document.getElementById('users_list'),
        store: store,
        fromFilter: true
    	})
    }
}

function sortUsers(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function searchUsers(store) {
	var userName = document.getElementById("userName").value.toLowerCase();
    var dateFrom = new Date(store.from_picker.get().split('.').reverse().join('.')).getTime();
    var dateTo = new Date(store.to_picker.get().split('.').reverse().join('.')).getTime();
    var sliderEarned = store.sliderEarned.get();
    var sliderSpent = store.sliderSpent.get();
    // console.log(dateFrom);
    store.searched = store.registeredUsers.filter(function(user) {
        if ((userName.length ? (user.name.toLowerCase()).indexOf(userName) !== -1 : true) && 
        	dateFrom <= user.registration_date_ts && 
        	user.registration_date_ts <= dateTo &&
        	Math.floor(sliderEarned[0]) <= user.points_earned &&
        	user.points_earned <= Math.ceil(sliderEarned[1]) &&
        	Math.floor(sliderSpent[0]) <= user.points_spent &&
        	user.points_spent <= Math.ceil(sliderSpent[1])
        	) return user;
    });
    renderUsersList({
        container: document.getElementById('users_list'),
        store: store,
        fromSearch: true
    })
}

function runPager(list, cntPerPage) {
    var count = list.length; //всего записей
    var cnt = cntPerPage; //сколько отображаем сначала
    var cnt_page = Math.ceil(count / cnt); //кол-во страниц

    //выводим список страниц
    var paginator = document.querySelector(".paginator");
    var page = "";
    for (var i = 0; i < cnt_page; i++) {
        page += "<span class='users_list_pagination_item' data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
    }
    paginator.innerHTML = page;

    //выводим первые записи {cnt}
    var div_num = document.querySelectorAll(".num");
    for (var i = 0; i < div_num.length; i++) {
        if (i < cnt) {
            div_num[i].style.display = "table-row";
        }
    }

    var main_page = document.getElementById("page1");
    main_page.classList.add("selected");

    //листаем
    function pagination(event) {
        var e = event || window.event;
        var target = e.target;
        var id = target.id;

        if (target.tagName.toLowerCase() != "span") return;

        var num_ = id.substr(4);
        var data_page = +target.dataset.page;
        main_page.classList.remove("selected");
        main_page = document.getElementById(id);
        main_page.classList.add("selected");

        var j = 0;
        for (var i = 0; i < div_num.length; i++) {
            var data_num = div_num[i].dataset.num;
            if (data_num <= data_page || data_num >= data_page)
                div_num[i].style.display = "none";

        }
        for (var i = data_page; i < div_num.length; i++) {
            if (j >= cnt) break;
            div_num[i].style.display = "table-row";
            j++;
        }
    }

    document.getElementById("paginator").addEventListener("click", pagination);
}

function renderUsersList(paramsObj) {
    paramsObj.container.firstElementChild.innerHTML = '';

    var from = paramsObj.fromSearch ||  paramsObj.fromFilter;

    if(paramsObj.fromSearch) from = 'search';
    else if(paramsObj.fromFilter) from = 'filter';
    else from = 'other'; 

    switch (from) {
	  case 'search':
	    var listLength = paramsObj.store.searched.length;
        for (var i = 0; i < listLength; i++) {
            var template = '<tr data-num=' + (i + 1) + ' class="num">' +
                '<td>' +
                paramsObj.store.searched[i].name +
                '</td>' +
                '<td>' +
                paramsObj.store.searched[i].registration_date +
                '</td>' +
                '<td>' +
                '<i class="user_points_icon"></i>' + paramsObj.store.searched[i].points_earned +
                '</td>' +
                '</tr>';
            paramsObj.container.firstElementChild.insertAdjacentHTML('beforeend', template);
        }
        runPager(paramsObj.store.searched, 20); 
        document.getElementById('filters_footer_count').innerHTML = paramsObj.store.searched.length + ' клиентов';
	    break;

	  case 'filter':
	  var listLength = paramsObj.store.filtered.length;
        for (var i = 0; i < listLength; i++) {
            var template = '<tr data-num=' + (i + 1) + ' class="num">' +
                '<td>' +
                paramsObj.store.filtered[i].name +
                '</td>' +
                '<td>' +
                paramsObj.store.filtered[i].registration_date +
                '</td>' +
                '<td>' +
                '<i class="user_points_icon"></i>' + paramsObj.store.filtered[i].points_earned +
                '</td>' +
                '</tr>';
            paramsObj.container.firstElementChild.insertAdjacentHTML('beforeend', template);
        }
        runPager(paramsObj.store.filtered, 20); 
        document.getElementById('filters_footer_count').innerHTML = paramsObj.store.filtered.length + ' клиентов';
	  	break;
	  	default:
	  	var listLength = paramsObj.store.registeredUsers.length;
        for (var i = 0; i < listLength; i++) {
            var template = '<tr data-num=' + (i + 1) + ' class="num">' +
                '<td>' +
                paramsObj.store.registeredUsers[i].name +
                '</td>' +
                '<td>' +
                paramsObj.store.registeredUsers[i].registration_date +
                '</td>' +
                '<td>' +
                '<i class="user_points_icon"></i>' + paramsObj.store.registeredUsers[i].points_earned +
                '</td>' +
                '</tr>';
            paramsObj.container.firstElementChild.insertAdjacentHTML('beforeend', template);
        }
        runPager(paramsObj.store.registeredUsers, 20);
        document.getElementById('filters_footer_count').innerHTML = paramsObj.store.registeredUsers.length + ' клиентов';
	}

    
}

function datePointParse(store) {
    var from_$input = $('#input_from').pickadate({
            min: new Date(store.users.min_registartion_date),
            max: new Date(store.users.max_registartion_date),
            format: 'dd.mm.yyyy'
        }),
        from_picker = from_$input.pickadate('picker')

    var to_$input = $('#input_to').pickadate({
            min: new Date(store.users.min_registartion_date),
            max: new Date(store.users.max_registartion_date),
            format: 'dd.mm.yyyy'
        }),
        to_picker = to_$input.pickadate('picker')

    store.from_picker = from_picker;
    store.to_picker = to_picker;

    // Check if there’s a “from” or “to” date to start with.
    if (from_picker.get('value')) {
        to_picker.set('min', from_picker.get('select'))
    }
    if (to_picker.get('value')) {
        from_picker.set('max', to_picker.get('select'))
    }

    // When something is selected, update the “from” and “to” limits.
    from_picker.on('set', function(event) {
        if (event.select) {
            to_picker.set('min', from_picker.get('select'))
        } else if ('clear' in event) {
            to_picker.set('min', false)
        }
    })
    to_picker.on('set', function(event) {
        if (event.select) {
            from_picker.set('max', to_picker.get('select'))
        } else if ('clear' in event) {
            from_picker.set('max', false)
        }
    })

    from_picker.set({
        select: new Date(store.users.min_registartion_date)
    });

    to_picker.set({
        select: new Date(store.users.max_registartion_date)
    });
}

function runSlider(paramsObj) { //min, max
    var uniqId = Date.now();
    var template = '<div style="margin-bottom: 20px;"><div class="filters_list_field_label">' +
        '<span class="form_search_param_label">' + paramsObj.label + '</span>' +
        '</div>' +
        '<div class="slider_wrap">' +
        '<div class="slider_simple ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">' +
        '<div id="html5' + uniqId + '"></div>' +
        '</div>' +
        '<div class="slider_inputs_wrap">' +
        '<div class="slider_inputs_placeholder">' +
        '<input type="number" class="uihidden" id="input-select' + uniqId + '">' +
        '<input type="number" class="uihidden" id="input-number' + uniqId + '">' +
        '<span id="outputMin' + uniqId + '"></span> — <span id="outputMax' + uniqId + '"></span>' +
        '</div>' +
        '</div>' +
        '</div></div>';
    paramsObj.container.insertAdjacentHTML('beforeend', template);
    var select = document.getElementById("input-select" + uniqId);
    var selectSimple = document.getElementById("outputMin" + uniqId);

    // Append the option elements
    for (var i = paramsObj.min; i <= paramsObj.max; i++) {
        var option = document.createElement("option");
        option.text = i;
        option.value = i;

        select.appendChild(option);
    }

    var html5Slider = document.getElementById("html5" + uniqId);

    noUiSlider.create(html5Slider, {
        start: [paramsObj.min, paramsObj.max],
        connect: true,
        range: {
            min: paramsObj.min,
            max: paramsObj.max
        }
    });

    var inputNumber = document.getElementById("input-number" + uniqId);
    var inputNumberSimple = document.getElementById("outputMax" + uniqId);

    html5Slider.noUiSlider.on("update", function(values, handle) {
        var value = values[handle];

        if (handle) {
            inputNumber.value = value;
            inputNumberSimple.textContent = Number(value).toFixed(0);
        } else {
            select.value = Math.round(parseInt(value));
            selectSimple.textContent = Number(value).toFixed(0);
        }
    });

    select.addEventListener("change", function() {
        html5Slider.noUiSlider.set([this.value, null]);
    });

    inputNumber.addEventListener("change", function() {
        html5Slider.noUiSlider.set([null, this.value]);
    });

    return html5Slider.noUiSlider;
}

function getJsonData(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}