init=function(){
	nMine=10;
	col=10;
	row=10;
	c=0;
	m=0;
	s=0;
	score=0;//己經click幾下
	mines=new Array();//紀錄mine位置,有mine為1,沒有為0
	document.getElementById('restart').addEventListener('click',(function(event) {
		window.location.reload();
	}).bind(this));
}

level=function(nlevel){
	var r = confirm("Are you sure you want to change the level?");
	if (r == true) {
		nMine=nlevel.value;
	}else{
		return;
	}
}

run=function(){
	init();
	highscore=0;
	minefield=document.getElementById('minefield');
	for(i=0;i<col;i++){
		mines[i]=new Array();
		for(j=0;j<row;j++){
			field=document.createElement('button');
			field.setAttribute('id',i + '-' + j);//每個button依他們的i,j座標分配id
			field.setAttribute('onclick','pushButton(this)');
			field.innerHTML='&nbsp;';//預設空白
			minefield.appendChild(field);
			mines[i][j]=0;// field預設為0,無地雷
		}
		minefield.innerHTML=minefield.innerHTML+'<BR/>';//換行
	}
}

pushButton=function(btn){
	curI=parseInt(btn.id.split('-')[0]);
	curJ=parseInt(btn.id.split('-')[1]);
	if(score==0){
		gameTimer=window.setInterval(this.timer,10);
		timer(gameTimer);	//第一次click, 開始讀秒
		count=0;
		while(count<nMine){	//用亂數配置地雷
			i=Math.floor(Math.random()*(col));
			j=Math.floor(Math.random()*(row));
			if(mines[i][j]!=1&&i!=curI&&j!=curJ){
				count++;
				mines[i][j]=1;
			}
		}
	}

	score++;

	mineCount=0;//計算鄰近八個格子裡的地雷數
	if(curI>0){//左上、上、右上的地雷數和
		mineCount = mineCount + mines[curI-1][curJ];
		if(curJ>0)
			mineCount = mineCount + mines[curI-1][curJ-1];
		if(curJ<col-1)
			mineCount = mineCount + mines[curI-1][curJ+1];
	}
	if(curI<row-1){//左下 下 右下
		mineCount = mineCount + mines[curI+1][curJ];
		if(curJ>0)
		mineCount = mineCount + mines[curI+1][curJ-1];
		if(curJ<col-1)
		mineCount = mineCount + mines[curI+1][curJ+1];
	}
	if(curJ>0)//左
		mineCount = mineCount + mines[curI][curJ-1];
	if(curJ<col-1)//右
		mineCount = mineCount + mines[curI][curJ+1];

	btn.innerHTML=mineCount;
	btn.setAttribute('disabled','disabled');
	
	if(mines[curI][curJ]==1){//踩到地雷
		btn.innerHTML='#';
		btn.setAttribute('disabled','disabled');
		clearInterval(gameTimer);
		alert('GAMEOVER!');
	}
	
	while(mineCount==0){
		if(curI>0){//左上、上、右上的地雷數和
				window.document.getElementById(curI-1+"-"+curJ).click();
			if(curJ>0)
				window.document.getElementById(curI-1+"-"+curJ-1).click();
			if(curJ<col-1)
				window.document.getElementById(curI-1+"-"+curJ+1).click();
		}
		if(curI<row-1){//左下 下 右下
			window.document.getElementById(curI+1+"-"+curJ).click();
			if(curJ>0)
			window.document.getElementById(curI+1+"-"+curJ-1).click();[curI+1][curJ-1];
			if(curJ<col-1)
			window.document.getElementById(curI+1+"-"+curJ+1).click();
		}
		if(curJ>0)//左
			window.document.getElementById(curI+"-"+curJ-1).click();
		if(curJ<col-1)//右
			window.document.getElementById(curI+"-"+curJ+1).click();
	}

	if(score==col*row-nMine){//WIN
		alert('YOU WIN!');
		clearTimeout(gameTimer);
	}
	
	document.getElementById('score').innerHTML= "Score: "+score*2;
}

openField=function(i,j){
	
}

timer=function(){
	c++;
	if(c==100){
		s++;
		c=0;
	}
    if(s==60){
		m++;
		s=0;
	}
	if(m=="0"||m=="1"||m=="2"||m=="3"||m=="4"||m=="5"||m=="6"||m=="7"||m=="8"||m=="9")
		m="0"+m;
	if(s=="0"||s=="1"||s=="2"||s=="3"||s=="4"||s=="5"||s=="6"||s=="7"||s=="8"||s=="9")
		s = "0" + s;
	document.getElementById('timer').innerHTML= "Time: "+m+":"+s;
}