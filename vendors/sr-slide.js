window.addEventListener('load', ()=>{
    const wrapper = '.sr-slide-wrap ';
    const allSlides = document.querySelectorAll(wrapper+'.single-slide');
    const lastindex = allSlides.length-1;
    if(lastindex<1)return;

    const select = el => document.querySelector(el);

    const setPosition = (i, pos=0, trans='.5s')=> 
        allSlides[i].style.cssText = 
        `left: ${pos}%; transition: ${trans}`;
    
    let interval;
    let timeout;
    let i=0;
    const navigateSlides = isPrev=>{
        let willMove;
        if(isPrev){
            i===0 ? i=lastindex : i--;
            willMove = i===lastindex ? 0 : i+1;
        }else{
            i===lastindex ? i=0 : i++;
            willMove = i===0 ? lastindex : i-1;
        }
        setPosition(i, (isPrev ? '-100' : '100'), 'none');
        setTimeout(()=>{
            setPosition(willMove, isPrev ? '100' : '-100')
            setPosition(i);
        }, 1);
        select(wrapper+'.bullets .active').classList.remove('active');
        select(wrapper+'.bullets #btn'+i).classList.add('active');
    }
    
    interval = setInterval(navigateSlides, 2000);
    const regulateInterval = () => {
        if(interval)clearInterval(interval);
        if(timeout)clearTimeout(timeout);
        timeout = setTimeout(() => {
            interval = setInterval(navigateSlides, 2000);
        }, 4000);
    }
    
    const bulletInit = ()=>{
        const bulletsWrap = select(wrapper+'.bullets');
        let buttons = '<button id="btn0" class="active"></button>';
        for(let i=1; i<=lastindex; i++)buttons += '<button id="btn'+i+'"></button>';
        bulletsWrap.innerHTML = buttons;
    
        bulletsWrap.addEventListener('click', e=>{
            const target = e.target;
            if(target.tagName !== 'BUTTON' || target.classList.contains('active'))return;
            regulateInterval();
            const id = parseInt(target.id.substr(3));
            select(wrapper+'.bullets .active').classList.remove('active');
            target.classList.add('active');
    
            setPosition(id, (i>id ? '-' : '')+'100', 'none');
            setTimeout(()=>{
                setPosition(id);
                setPosition(i, (i>id ? '' : '-') + '100');
                i=id;
            }, 1);
        })
    }
    bulletInit();
});