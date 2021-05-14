window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var pic = document.querySelector('.pic');
    var circle = document.querySelector('.circle');
    var flag = true;
    var index = 0;
    var timer = null;

    function movement(object, target, action) {
        clearInterval(object.timer);
        object.timer = setInterval(function () {
            var step = (target - object.offsetLeft) / 10;
            step = step < 0 ? Math.floor(step) : Math.ceil(step);
            object.style.left = object.offsetLeft + step + 'px';
            if (object.offsetLeft == target) {
                clearInterval(object.timer);
                if (action) {
                    action();
                }
            }
        }, 30)
    }

    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        clearInterval(timer);
    })
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        timer = setInterval(function () {
            arrow_r.click();
        }, 1000)
    })

    for (var i = 0; i < pic.children.length; i += 1) {
        pic.children[0].setAttribute('index', i);
    }

    for (var i = 0; i < pic.children.length; i += 1) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        circle.append(li);
        li.addEventListener('click', function () {
            circle.children[index].className = '';
            index = this.getAttribute('index');
            this.className = 'selected';
            movement(pic, -index * focus.offsetWidth);
        })
    }
    circle.children[0].className = 'selected';

    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            circle.children[index].className = '';
            index = (index + 1) % circle.children.length;
            circle.children[index].className = 'selected';
            movement(pic, -index * focus.offsetWidth, function () {
                flag = true;
            });
        }
    })

    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            circle.children[index].className = '';
            index = index - 1;
            index = index < 0 ? circle.children.length - 1 : index;
            circle.children[index].className = 'selected';
            movement(pic, -index * focus.offsetWidth, function () {
                flag = true;
            });
        }
    })

    timer = setInterval(function () {
        arrow_r.click();
    }, 3000)

    var move = document.querySelector('.move');
    var divX = move.offsetLeft;
    var divY = move.offsetTop;
    var mouseX = 0;
    var mouseY = 0;

    move.addEventListener('touchstart', function (e) {
        mouseX = e.targetTouches[0].pageX;
        mouseY = e.targetTouches[0].pageY;
        divX = move.offsetLeft;
        divY = move.offsetTop;
    })

    move.addEventListener('touchmove', function (e) {
        var moveX = mouseX - e.targetTouches[0].pageX;
        var moveY = mouseY - e.targetTouches[0].pageY;
        this.style.left = (divX - moveX) + 'px';
        this.style.top = (divY - moveY) + 'px';
        e.preventDefault();
    })


    var go_back = document.querySelector('.go-back');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            go_back.style.display = 'block';
        } else {
            go_back.style.display = 'none';
        }
    })
    go_back.addEventListener('touchstart', function () {
        scroll(0, 0);
    })
})