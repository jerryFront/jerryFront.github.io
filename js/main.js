
  var pConfig={
    t_en:['SERVICE','EVENTS','ACTIVITIES','PARTNERS','JOBS','CONTACT'],
    t_cn:['服务','案例','活动','合作伙伴',"招聘","联系我们"],
    t_slogan:[''],
    timer:null,
    index:0, //记录滑动板块index，默认0
    preventScroll:false,
    percent:10,
    map:null,
    video0:null,
    video1:null,
    video2:null,
    swiper0:null,
    swiper1:null,
    swiper2:null,
    swiper2_1:null,
    swiper2_2:null,
    swiper2_3:null,
  }
  var slideHeight = $(window).height();



//移动端相关初始化处理
function initInMobile($){

  var _step=setInterval(function(){  
    if(pConfig.percent<100){
     pConfig.percent+=Math.floor(Math.random()*10)+10
     $('.preloader .text').text((pConfig.percent>=100?100:pConfig.percent)+'%')
    }else{
      clearTimeout(_step)
      setTimeout(function(){
       //后续动画消失，设置class
       document.getElementsByClassName('preloader')[0].style.display='none'
     },200)
    }
  },250)

  //#main-slider

  //初始化的时候高度
  $('#tops').css('height', slideHeight);
  $('#service').css({'display':'none','height':0});
  $('#case').css({'display':'none','height':0});
  $('#news').css({'display':'none','height':0});
  $('#team').css({'display':'none','height':0});
  $('#contact').css({'display':'none','height':0});

  //增加监听上滑事件
  var y1=0,y2=0
  $(document).delegate('section','touchstart',function(e){
    y1=e.originalEvent.touches[0].pageY
  })
  $(document).delegate('section','touchend',function(e){
    y2=e.originalEvent.changedTouches[0].pageY
    if(y1-y2>=100) pageScrollNext()
  })

}


//PC端初始化处理
function initInPC($){
  //初始化的时候高度
        //  $("body").animate({"scrollTop":"0px"},100);
        /**初始化Swiper */
        if(!pConfig.swiper2){
  
          pConfig.swiper2=new Swiper('#swiper2', {
            autoHeight: true, //enable auto height
            spaceBetween: 20,
            slidesPerView: 1,
            passiveListeners : false,
            direction: 'vertical',
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
              waitForTransition:true,
            },
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
          pConfig.swiper2.on('slideChange', function () {
            console.log(this.activeIndex);
          });

        } 

      $('#swiper2 .swiper-slide').mouseover(function(){
        if(pConfig.swiper2)  pConfig.swiper2.autoplay.stop();
         var index=$(this).index() 
         $(this).find('.image-background').removeClass('hidden')
      }).mouseout(function(){
        $(this).find('.image-background').addClass('hidden')
        if(pConfig.swiper2)  pConfig.swiper2.autoplay.start();
      })  

      $('#news .activity-area nav').hover(function(){
        $(this).find('article').css({'display':'block'})
      },function(){
        $(this).find('article').css({'display':'none'})
      })

      initMap(1)
      initVideo()

          
}

/**加载video等配置 */
function initVideo(type){
     var ext=type?'':'0',width=type?247.5:275,height=type?150:380
     pConfig.video0=new Clappr.Player({
      source: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", 
      poster: './images/poster.png',
      mute: true,
      parentId: "#video0"+ext,
      height:height,
      width:width
      });
     pConfig.video1=new Clappr.Player({
        source: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", 
        poster: './images/poster.png',
        mute: true,
        parentId: "#video1"+ext,
        height:height,
        width:width
     });
     pConfig.video2=new Clappr.Player({
      source: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", 
      poster: './images/poster.png',
      mute: true,
      parentId: "#video2"+ext,
      height:height,
      width:width
     });  
}

//弹出层新生成swiper
function showSilder(index){
    var marginTop=(slideHeight/2-300)+'px'
    $('.u-masker .swiper-contain-area .swiper-container').addClass('hidden')
    $('.u-masker').removeClass('hidden')
    $('.u-masker .swiper-contain-area').css({'margin-top':marginTop})
    if(index==1){
      $('#swiper3').removeClass('hidden') 
     if(!pConfig.swiper3) pConfig.swiper3=new Swiper('#swiper3', {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        slidesPerView: 1,
        passiveListeners : false,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    if(index==2){
      $('#swiper4').removeClass('hidden') 
      if(!pConfig.swiper4) pConfig.swiper4=new Swiper('#swiper4', {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        slidesPerView: 1,
        passiveListeners : false,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    if(index==3){
      $('#swiper5').removeClass('hidden') 
      if(!pConfig.swiper5) pConfig.swiper5=new Swiper('#swiper5', {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        slidesPerView: 1,
        passiveListeners : false,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
}

/**
 * 关闭弹出的swiper
 * 需要同时关闭播放等 
 * */
function closeMasker(){

  $('.u-masker').addClass('hidden')
}


//滑动到下一页
function pageScrollNext(){
  if(pConfig.preventScroll) return 
  pConfig.preventScroll=true 
  if(pConfig.index<5){
    var _dom=$('section').eq(++pConfig.index),_id=_dom.attr('id')
    _dom.css({'display':'block','height':slideHeight}).addClass('fadeInUp')
    // location.href='#'+_id
    window.scroll({top:(slideHeight*pConfig.index), left: 0, behavior: 'smooth'})
    //需要滑动到下一屏
    setTimeout(function(){pConfig.preventScroll=false},1000)
    if(pConfig.index>=5) $('#bottom-arrow').remove()
  }

}

//初始化地图 type 1 pc,0 mobile
function initMap(type){ 
  type=type?'map1':'map' 
  if(!pConfig.map){
    pConfig.map=new BMap.Map(type)
    pConfig.map.enableAutoResize()
    pConfig.map.enableDragging()
    pConfig.map.centerAndZoom(new BMap.Point(113.341441,23.131713),18)
    var marker = new BMap.Marker(
    new BMap.Point(113.341441,23.131713));
    pConfig.map.addOverlay(marker)  
  }
}




jQuery(function($) {
  //Preloader
  var w = $(window).width();




  $(window).load(function() {



    //Initiat WOW JS
    new WOW().init();
    //smoothScroll
    smoothScroll.init();

     if(w<=768){
        initInMobile($)
     }else{
        initInPC($)
     }
    

  });





  $('#service .foucs-area aside nav').hover(function(){
    $(this).addClass('active').siblings().removeClass('active')
  })  

  //Scroll Menu
  $(window).on('scroll', function() {
    if(w>768){
      if ($(window).scrollTop() > slideHeight) {
        $('.navbar-default').addClass('navbar-fixed-top');
      } else {
        $('.navbar-default').removeClass('navbar-fixed-top');
      }
      

    }else{
      /**优化方案 等到滑到对应屏 才加载对应的item */
      let scrollHeight=$(window).scrollTop()
      if(scrollHeight>slideHeight){
        if(!pConfig.swiper0){
          pConfig.swiper0=new Swiper('#swiper0', {
          autoHeight: true, //enable auto height
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          spaceBetween: 20,
          slidesPerView: 1,
          passiveListeners : false,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        $('#swiper0 .video').mouseover(function(){
          if(pConfig.swiper0)  pConfig.swiper0.autoplay.stop();
        }).mouseout(function(){
          if(pConfig.swiper0)  pConfig.swiper0.autoplay.start();
        })  
      }
        if(!pConfig.video0) initVideo(1)
   
      }
      if(scrollHeight>=2*slideHeight){
        if(!pConfig.swiper1) pConfig.swiper1=new Swiper('#swiper1', {
          autoHeight: true, //enable auto height
          spaceBetween: 20,
          slidesPerView: 1,
          passiveListeners : false,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
      }
     
      if(scrollHeight>=4*slideHeight){ 
         initMap(0)

      }

      

    }

  });

  // Navigation Scroll
  $(window).scroll(function(event) {
    Scroll();
  });


 

  $('.navbar-collapse ul li').hover(function() {
    var i=$(this).index()
    $(this).find('a').text(pConfig.t_cn[i])

  },function(){
    var i=$(this).index()
    $(this).find('a').text(pConfig.t_en[i])
  });

  $('.navbar-collapse ul li a').on('click', function() {
    var i=$(this).index()
    $(this).find('a').text(pConfig.t_cn[i])
    $('html, body').animate({ scrollTop: $(this.hash).offset().top - 5 }, 500);
    return false;
  });

  // User define function
  function Scroll() {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    if(w>768){
      $('.navbar-collapse')
      .find('.scroll a')
      .each(function() {
        contentTop.push($($(this).attr('href')).offset().top);
        contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
      });
    $.each(contentTop, function(i) {
      if (winTop > contentTop[i] - rangeTop) {
        $('.navbar-collapse li.scroll')
          .removeClass('active')
          .eq(i)
          .addClass('active');
        $('.navbar-collapse li.scroll').each(function(i){
           $(this).find('a').text(pConfig.t_en[i]) 
        })  
        $('.navbar-collapse li.scroll').eq(i).find('a').text(pConfig.t_cn[i])  
      }
    });
   }

  }

  $('#tohash').on('click', function() {
    $('html, body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
    return false;
  });



  // Progress Bar
  $('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $.each($('div.progress-bar'), function() {
        $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
      });
      $(this).unbind('inview');
    }
  });

  //Countdown
  $('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $(this)
        .find('.timer')
        .each(function() {
          var $this = $(this);
          $({ Counter: 0 }).animate(
            { Counter: $this.text() },
            {
              duration: 2000,
              easing: 'swing',
              step: function() {
                $this.text(Math.ceil(this.Counter));
              },
            }
          );
        });
      $(this).unbind('inview');
    }
  });

  // // Portfolio Single View
  // $('#portfolio').on('click', '.folio-read-more', function(event) {
  //   event.preventDefault();
  //   var link = $(this).data('single_url');
  //   var full_url = '#portfolio-single-wrap',
  //     parts = full_url.split('#'),
  //     trgt = parts[1],
  //     target_top = $('#' + trgt).offset().top;

  
  //   $('#portfolio-single').slideUp(500, function() {
  //     $(this).load(link, function() {
  //       $(this).slideDown(500);
  //     });
  //   });
  // });

  // // Close Portfolio Single View
  // $('#portfolio-single-wrap').on('click', '.close-folio-item', function(event) {
  //   event.preventDefault();
  //   var full_url = '#portfolio',
  //     parts = full_url.split('#'),
  //     trgt = parts[1],
  //     target_offset = $('#' + trgt).offset(),
  //     target_top = target_offset.top;
  //   $('html, body').animate({ scrollTop: target_top }, 600);
  //   $('#portfolio-single').slideUp(500);
  // });


  //   $('html, body').animate({ scrollTop: target_top }, 600);


  $('#team .team-members').delegate('.conBg','click',function(){
    console.log($(this).attr('class'))
    if ($(this).hasClass('team_border')) {
      $(this)
        .next('.pane_All')
        .slideUp()
        .removeClass('team_border active');
      $(this).removeClass('team_border active');
      $(this)
        .find('.conArr')
        .removeClass('active');
    } else {
      $(this)
        .next('.pane_All')
        .slideDown();
      $(this).addClass('team_border active');
      $(this)
        .find('.conArr')
        .addClass('active');
    }
  })





});


