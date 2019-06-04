
$( function(){

    // 项目经验里的导航中记录上次点击的是哪个
    let tabIndex = 0;
    // 获取项目经验中导航的所有项
    const $tabItems = $('#project-experience .tab-container .tab-content .tab-content-item');
    // 获取项目经验中的所有项目经验项
    const $contentItems = $('#project-experience .content-all-item');
    // 获取轮播容器
    const $carouselContainer = $('#self-evaluation .self-evaluation-carousel');
    // 获取自我评价的左右点击按钮
    const $gotoPrev = $('#self-evaluation .self-evaluation-carousel .goto-prev');
    const $gotoNext = $('#self-evaluation .self-evaluation-carousel .goto-next');
    // 获取轮播的容器
    const $ulContainer = $('#self-evaluation .self-evaluation-carousel ul');
    // 获取所有静止移动条
    const $olItems = $('#self-evaluation .self-evaluation-carousel ol li').filter(':not(.move-bar)');
    // 获取移动的移动条（带有move-bar类名的）
    const $moveBar = $('#self-evaluation .self-evaluation-carousel ol li.move-bar');
    // 获取logo
    const $headerlogo = $('#header a.header-home');
    // 获取了解更多按钮
    const $learnMore = $('#cover .cover-learn-more');
    // 获取每一个部分的高度可能有些有内边距，导致还需要获取内边距，所以可以获取每部分到顶部距离
    const coverToTop = $('#cover').offset().top;
    const basicInfoToTop = $('#basic-info').offset().top;
    const skillToTop = $('#skill').offset().top;
    const lifeExperienceToTop = $('#life-experience').offset().top;
    const projectExperienceToTop = $('#project-experience').offset().top;
    const selfEvaluationToTop = $('#self-evaluation').offset().top;
    const contactInfoToTop = $('#contact-info').offset().top;
    // 获取所有导航项
    const $navItems = $('#header #hmlight-nav ul li');
    // 记录当前轮播的序号
    let carouselIndex = 0;


    // 滚动页面，导航添加背景 固定在顶部
    $(window).scroll(function(){
        let offsetTopInstance =  $('.navbar').offset().top;
        if(offsetTopInstance > 20){
            $('#header .navbar').css({
                top: 0,
                backgroundColor: '#000'
            })
        } else{
            $('#header .navbar').css({
                top: 20,
                backgroundColor: 'transparent'
            })
        }
    });

    // 点击logo图标滚轮回到顶部

    $headerlogo.on('click', function(){
        $('html, body').animate({scrollTop: 0}, 1000);
    });




    // 了解更多 点击向下滚动
    $learnMore.on('click', function(){
        $('html, body').animate({scrollTop: basicInfoToTop - 50}, 1000);
    });

    // 点击顶部导航页面向上缓缓滚动到对应的位置
    $navItems.each(function(index, item){
        $(item).on('click', function(){
            switch(index){
                case 0 :
                    return $('html, body').animate({scrollTop: basicInfoToTop - 50}, 1000);
                case 1 :
                    return $('html, body').animate({scrollTop: skillToTop - 110}, 1000);
                case 2 :
                    return $('html, body').animate({scrollTop: lifeExperienceToTop - 50}, 1000);
                case 3 :
                    return $('html, body').animate({scrollTop: projectExperienceToTop - 50}, 1000);
                case 4 :
                    return $('html, body').animate({scrollTop: selfEvaluationToTop - 50}, 1000);
                case 5 :
                    return $('html, body').animate({scrollTop: contactInfoToTop - 50}, 1000);
            }
        })
    });

    // trigger() 方法触发被选元素上指定的事件以及事件的默认行为
    $(window).trigger('scroll');

    // 项目经验里的导航，点击效果
    $tabItems.each(function(index,value){
        $(value).on('click', function(){
            $($tabItems[tabIndex]).parent().removeClass('tab-active');
            tabIndex = index;
            // 给点击的添加tab-active类名
            $(value).parent().addClass('tab-active');
            if($(value).hasClass('project-item-all')){
                // project-item-all 若点击的按钮带有该类名，则显示带给有该类名的item项
                $('#project-experience .tab-content-all .project-item-all').slideDown(500);
            } else if($(value).hasClass('project-item-mobile')){
                //project-item-mobile 若点击的按钮带有该类名，则显示带给有该类名的item项
                $('#project-experience .tab-content-all .project-item-pc').slideUp(500);
                $('#project-experience .tab-content-all .project-item-response').slideUp(500);
                $('#project-experience .tab-content-all .project-item-mobile').slideDown(500);
            } else if($(value).hasClass('project-item-pc')){
                //project-item-pc 若点击的按钮带有该类名，则显示带给有该类名的item项
                $('#project-experience .tab-content-all .project-item-response').slideUp(500);
                $('#project-experience .tab-content-all .project-item-mobile').slideUp(500);
                $('#project-experience .tab-content-all .project-item-pc').slideDown(500);
            } else{
                //project-item-response 若点击的按钮带有该类名，则显示带给有该类名的item项
                $('#project-experience .tab-content-all .project-item-pc').slideUp(500);
                $('#project-experience .tab-content-all .project-item-mobile').slideUp(500);
                $('#project-experience .tab-content-all .project-item-response').slideDown(500);
            }
        })
    });

    // 项目经验里的每项鼠标移入移出效果
    $contentItems.each(function(index, item){
        $(item).on('mouseenter', function(){
            $(item).children('.content-all-item-info').fadeIn();
        });
        $(item).on('mouseleave', function(){
            $(item).children('.content-all-item-info').fadeOut(1000);
        })
    });
    // 左按钮点击函数
    function gotoPrev(){
        if(carouselIndex === 0){
            carouselIndex = 3;
            $ulContainer.css({left: -($ulContainer.width() / 4) * carouselIndex});
            carouselIndex = 2;
            $ulContainer.animate({left: -($ulContainer.width() / 4) * carouselIndex},  1000);
            $moveBar.animate({left: 48 * carouselIndex - 8},  1000);
        } else{
            if(carouselIndex > 0){
                $ulContainer.animate({left: -($ulContainer.width() / 4) * (carouselIndex - 1)},  1000);
                carouselIndex--;
                $moveBar.animate({left: 48 * carouselIndex - 8},  1000);
            } else{
                carouselIndex = 0;
            }
        }
    }

    // 右按钮点击函数
    function gotoNext(){
        if(carouselIndex === 2){
            $ulContainer.animate({left: -($ulContainer.width() / 4) * (carouselIndex + 1)},  1000, function(){
                carouselIndex = 0;
                $ulContainer.css({left: -($ulContainer.width() / 4) * carouselIndex});
            });

            $moveBar.animate({left: -8},  1000);
        } else{
            if(carouselIndex === 3){
                $ulContainer.animate({left: -($ulContainer.width() / 4) * carouselIndex},1000, function(){
                    carouselIndex = 0;
                    $moveBar.animate({left: 48 * carouselIndex - 8},  1000);
                });
            } else{
                $ulContainer.animate({left: -($ulContainer.width() / 4) * (carouselIndex + 1)},  1000);
                carouselIndex++;
                $moveBar.animate({left: 48 * carouselIndex - 8},  1000);
            }
        }
    }
    // 左按钮切换轮播内容 滚动条移动
    $gotoPrev.on('click', gotoPrev);
    // 右按钮切换轮播内容 滚动条移动
    $gotoNext.on('click', gotoNext);


    // 点击滚动条切换轮播内容
    $olItems.each(function(index, item){
        $(item).on('click', function(){
            carouselIndex = index;
            $moveBar.animate({left: 48 * carouselIndex - 8},  1000);
            $ulContainer.animate({left: -($ulContainer.width() / 4) * carouselIndex},  1000);
        })
    });

    clearInterval(0);
    let carouselContainer = setInterval(gotoNext, 3000);
    // 鼠标移入移出左右按钮显示隐藏 定时器开关
    $carouselContainer.on('mouseenter', function(){
        $gotoPrev.fadeIn(500);
        $gotoNext.fadeIn(500);
        clearInterval(carouselContainer);
    });
    $carouselContainer.on('mouseleave', function(){
        $gotoPrev.fadeOut(500);
        $gotoNext.fadeOut(500);
        carouselContainer = setInterval(gotoNext, 3000);
    });

});

/*
*   jquery
*   在页面DOM文档加载完成后加载执行的
*   $(function(){})
*   等效于$(document).ready(function(){})
*   上面两种方法优于window.onload = function(){}
*
*/









