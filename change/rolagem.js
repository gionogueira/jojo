$(document).ready(function(){

/**
 * This object controls the nav bar. Implement the add and remove
 * action over the elements of the nav bar that we want to change.
 *
 * @type {{flagAdd: boolean, elements: string[], add: Function, remove: Function}}
 */
var myNavBar = {

    flagAdd: true,

    elements: [],

    init: function (elements) {
        this.elements = elements;
    },

    add : function() {
        if(this.flagAdd) {
            for(var i=0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className += " fixar";
            }
            this.flagAdd = false;
            console.log(this.flagAdd);
        }
    },

    remove: function() {
        for(var i=0; i < this.elements.length; i++) {
            document.getElementById(this.elements[i]).className =
                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixar(?!\S)/g , '' );
        }
        this.flagAdd = true;
    }

};

/**
 * Init the object. Pass the object the array of elements
 * that we want to change when the scroll goes down
 */
myNavBar.init(  [
    "header"
]);

/**
 * Function that manage the direction
 * of the scroll
 */
function offSetManager(){

    var yOffset = 220;
    var currYOffSet = window.pageYOffset;

    if(yOffset < currYOffSet) {
        myNavBar.add();
    }
    else if(currYOffSet <= yOffset){
        myNavBar.remove();
    }

}

/**
 * bind to the document scroll detection
 */
window.onscroll = function(e) {
    offSetManager();
}

/**
 * We have to do a first detectation of offset because the page
 * could be load with scroll down set.
 */
offSetManager();
});

$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('a[href="#cabe"]').fadeIn();
        } else {
            $('a[href="#cabe"]').fadeOut();
        }
    });

    $('a[href="#cabe"]').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });
    $('#check').on('submit', function(e){
      e.preventDefault();
      var data={
        nome: $('input[name="nome"]').val(),
        email: $('input[name="email"]').val(),
        telefone: $('input[name="telefone"]').val(),
        mensagem: $('textarea[name="mensagem"]').val()
      }
      axios.post('http://bot-jojo-patsserie.herokuapp.com/mensagem', data)
        .then(function(response) {
          window.location.replace('confirm.html');
        }).catch(function(e) {
          window.location.replace('confirm.html');
        })
        /*
      $.ajax({
        type: 'POST',
        url:'http://bot-jojo-patsserie.herokuapp.com/mensagem',
        data:JSON.stringify(data),
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success: function(){
          window.location.replace('confirm.html');
        }
      });
      */
    });

});

function initMap() {
        var uluru = {lat: -5.8751765, lng: -35.1805885};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}

function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2");
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");
    return v;
}
