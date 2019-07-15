
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
    audio:null,
    audioStatus:0, //记录播放状态,0初始状态，1正在播放，-1手动暂停
  }
  var slideHeight = Math.max($(window).height(),667);




//移动端相关初始化处理
function initInMobile($){
  

  pConfig.audio=document.getElementById('audio')
  pConfig.audio.src='images/music.mp3'
  pConfig.audio.load()

  //尝试处理chrome50阻止默认播放的问题，未解决
  var pro=pConfig.audio.play()
  if(pro!==undefined){
    pro.then(function(res){
      pConfig.audio.play()
    }).catch(function(res){
      pConfig.audio.play()
    })
  }

  document.addEventListener('touchstart',function(){
    if(!pConfig.audioStatus){
      pConfig.audio.play()
      pConfig.audioStatus=1
    }
  })

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

  
  $('#AudioBtn').on('click',function(){
      if($(this).hasClass('on')){
         $(this).removeClass('on').addClass('off')
         if(pConfig.audio){
           pConfig.audio.pause()
           pConfig.audioStatus=-1
         }  
      }else{
         $(this).removeClass('off').addClass('on')
         if(pConfig.audio){
           pConfig.audio.play()
           pConfig.audioStatus=1
         }
      }
  })

  

  //#main-slider

  //初始化的时候高度
  $('#tops').css('height', slideHeight);
  $('#service').css({'height':slideHeight});
  // $('#case').css({'height':slideHeight});
  // $('#news').css({'height':slideHeight});
  // $('#team').css({'min-height':slideHeight});
  // $('#contact').css({'height':slideHeight});

  // //增加监听上滑事件
  // var y1=0,y2=0
  // $(document).delegate('section','touchstart',function(e){
  //   y1=e.originalEvent.touches[0].pageY
  // })
  // $(document).delegate('section','touchend',function(e){
  //   y2=e.originalEvent.changedTouches[0].pageY
  //   if(y1-y2>=100) pageScrollNext()
  // })

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
            lazy: {
              loadPrevNext: true,
            },
            autoplay: {
              delay: 6000,
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


     $('.lazy').lazyload() 

      initMap(1)
      initVideo()

          
}

/**加载video等配置 */
function initVideo(type){
     var ext=type?'':'0',width=type?247.5:275,height=type?150:380
     pConfig.video0=new Clappr.Player({
      source: "https://gzmetis.oss-cn-shenzhen.aliyuncs.com/BoLaiYa_Webshow_lowq.mp4", 
      poster: './images/poster1.png',
      mute: true,
      parentId: "#video0"+ext,
      height:type?height:256,
      width:type?width:391,
      });
     pConfig.video1=new Clappr.Player({
        source: "https://gzmetis.oss-cn-shenzhen.aliyuncs.com/WeiNuoNa_Webshow_lowq.mp4",
        poster: './images/poster0.png',
        mute: true,
        parentId: "#video1"+ext,
        height:type?height:256,
        width:type?width:391,
     });
     pConfig.video2=new Clappr.Player({
      source: "./images/xiaohongshu.mp4", 
      poster: './images/poster2.png',
      mute: true,
      parentId: "#video2"+ext,
      height:height,
      width:width
     });  
}

//弹出层新生成swiper
function showSilder(index){

    var marginTop=(($(window).height())/2-300)+'px'
    $('.u-masker .swiper-contain-area .swiper-container').addClass('hidden')
    $('.u-masker').removeClass('hidden')
    $('.u-masker .swiper-contain-area').css({'margin-top':marginTop})
    if(index==1){
      $('#swiper3').removeClass('hidden') 
     if(!pConfig.swiper3) {
       pConfig.swiper3=new Swiper('#swiper3', {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        slidesPerView: 1,
        lazy: {
          loadPrevNext: true,
        },
        passiveListeners : false,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
     }
    }
    if(index==2){
      $('#swiper4').removeClass('hidden') 
      if(!pConfig.swiper4) {

        pConfig.swiper4=new Swiper('#swiper4', {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        slidesPerView: 1,
        lazy: {
          loadPrevNext: true,
        },
        passiveListeners : false,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    }
    if(index==3){
      $('#swiper5').removeClass('hidden') 
      if(!pConfig.swiper5){

        pConfig.swiper5=new Swiper('#swiper5', {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        lazy: {
          loadPrevNext: true,
        },
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
  if(pConfig.index<2){
    var _dom=$('section').eq(++pConfig.index),_id=_dom.attr('id')
    _dom.css({'display':'block','height':slideHeight}).addClass('fadeInUp')
    // location.href='#'+_id
    window.scroll({top:(slideHeight*pConfig.index), left: 0, behavior: 'smooth'})
    //需要滑动到下一屏
    setTimeout(function(){pConfig.preventScroll=false},1000)
    if(pConfig.index>=1) $('#bottom-arrow').remove()
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


  $('html, body').animate({ scrollTop:0})
  


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
      if(scrollHeight<slideHeight)  $('#bottom-arrow').css({'display':'block'})
      if(scrollHeight>=slideHeight){
        $('#bottom-arrow').css({'display':'none'})
        if(!pConfig.swiper0){
          // $('#swiper0  img.lazy').each(function(){
          //   $(this).lazyload({effect: "fadeIn",threshold :6000,failurelimit:100})
          // })
          // $('#swiper1  img.lazy').each(function(){
          //   $(this).lazyload({effect: "fadeIn",threshold :3000,failurelimit:20})
          // })
          pConfig.swiper0=new Swiper('#swiper0', {
          autoHeight: true, //enable auto height
          autoplay: {
            delay: 6000,
            disableOnInteraction: false,
          },
          lazy: {
            loadPrevNext: true,
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
        if(!pConfig.swiper1){
          pConfig.swiper1=new Swiper('#swiper1', {
          autoHeight: true, //enable auto height
          lazy: {
            loadPrevNext: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
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


 
  var _previousClick=0
  $('.navbar-collapse ul li').hover(function() {
    var i=$(this).index()
    //要将上次hover字体归为英文
    $('.navbar-collapse ul li').eq(_previousClick).find('a').text(pConfig.t_en[_previousClick])
    $(this).find('a').text(pConfig.t_cn[i])
    $(this).addClass('active').siblings().removeClass('active')
  },function(){
    var i=$(this).index()
    $(this).find('a').text(pConfig.t_en[i])


    //恢复之前click选中的index
    $('.navbar-collapse ul li').eq(_previousClick).find('a').text(pConfig.t_cn[_previousClick])
    $('.navbar-collapse ul li').eq(_previousClick).addClass('active').siblings().removeClass('active')

  });

  $('.navbar-collapse ul li').on('click', function() {
    var i=$(this).index()
    _previousClick=i
    $(this).find('a').text(pConfig.t_cn[i])
    $(this).addClass('active').siblings().removeClass('active')
    $('html, body').animate({ scrollTop: $($(this).find('a')[0].hash).offset().top - 5 }, 500);
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
          _previousClick=i
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


