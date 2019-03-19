/*
 Highcharts JS v5.0.0 (2016-09-29)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function(x){"object"===typeof module&&module.exports?module.exports=x:x(Highcharts)})(function(x){(function(a){function f(a,b,g){this.init(a,b,g)}var r=a.each,u=a.extend,l=a.merge,p=a.splat;u(f.prototype,{init:function(a,b,g){var d=this,n=d.defaultOptions;d.chart=b;d.options=a=l(n,b.angular?{background:{}}:void 0,a);(a=a.background)&&r([].concat(p(a)).reverse(),function(b){var c,a=g.userOptions;c=l(d.defaultBackgroundOptions,b);b.backgroundColor&&(c.backgroundColor=b.backgroundColor);c.color=c.backgroundColor;
    g.options.plotBands.unshift(c);a.plotBands=a.plotBands||[];a.plotBands!==g.options.plotBands&&a.plotBands.unshift(c)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{className:"highcharts-pane",shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});a.Pane=f})(x);(function(a){var f=a.CenteredSeriesMixin,
    r=a.each,u=a.extend,l=a.map,p=a.merge,q=a.noop,b=a.Pane,g=a.pick,d=a.pInt,n=a.splat,h=a.wrap,c,e,k=a.Axis.prototype;a=a.Tick.prototype;c={getOffset:q,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:q,setCategories:q,setTitle:q};e={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},
    defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(d){d=this.options=p(this.defaultOptions,this.defaultRadialOptions,d);d.plotBands||(d.plotBands=[])},getOffset:function(){k.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=
        f.getCenter.call(this.pane)},getLinePath:function(d,m){var b=this.center,c,a=this.chart;c=g(m,b[2]/2-this.offset);this.isCircular||void 0!==m?b=this.chart.renderer.symbols.arc(this.left+b[0],this.top+b[1],c,c,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}):(c=this.postTranslate(this.angleRad,c),b=["M",b[0]+a.plotLeft,b[1]+a.plotTop,"L",c.x,c.y]);return b},setAxisTranslation:function(){k.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/
    (this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===g(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){k.setAxisSize.call(this);this.isRadial&&(this.center=this.pane.center=f.getCenter.call(this.pane),this.isCircular&&
    (this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*g(this.sector,1)/2)},getPosition:function(d,m){return this.postTranslate(this.isCircular?this.translate(d):this.angleRad,g(this.isCircular?m:this.translate(d),this.center[2]/2)-this.offset)},postTranslate:function(d,m){var b=this.chart,c=this.center;d=this.startAngleRad+d;return{x:b.plotLeft+c[0]+Math.cos(d)*m,y:b.plotTop+c[1]+Math.sin(d)*m}},getPlotBandPath:function(b,m,c){var a=this.center,n=this.startAngleRad,
        k=a[2]/2,e=[g(c.outerRadius,"100%"),c.innerRadius,g(c.thickness,10)],h=Math.min(this.offset,0),C=/%$/,q,p=this.isCircular;"polygon"===this.options.gridLineInterpolation?a=this.getPlotLinePath(b).concat(this.getPlotLinePath(m,!0)):(b=Math.max(b,this.min),m=Math.min(m,this.max),p||(e[0]=this.translate(b),e[1]=this.translate(m)),e=l(e,function(b){C.test(b)&&(b=d(b,10)*k/100);return b}),"circle"!==c.shape&&p?(b=n+this.translate(b),m=n+this.translate(m)):(b=-Math.PI/2,m=1.5*Math.PI,q=!0),e[0]-=h,e[2]-=
        h,a=this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],e[0],e[0],{start:Math.min(b,m),end:Math.max(b,m),innerR:g(e[1],e[0]-e[2]),open:q}));return a},getPlotLinePath:function(b,d){var c=this,g=c.center,a=c.chart,e=c.getPosition(b),n,k,h;c.isCircular?h=["M",g[0]+a.plotLeft,g[1]+a.plotTop,"L",e.x,e.y]:"circle"===c.options.gridLineInterpolation?(b=c.translate(b))&&(h=c.getLinePath(0,b)):(r(a.xAxis,function(b){b.pane===c.pane&&(n=b)}),h=[],b=c.translate(b),g=n.tickPositions,n.autoConnect&&(g=
        g.concat([g[0]])),d&&(g=[].concat(g).reverse()),r(g,function(d,c){k=n.getPosition(d,b);h.push(c?"L":"M",k.x,k.y)}));return h},getTitlePosition:function(){var b=this.center,d=this.chart,c=this.options.title;return{x:d.plotLeft+b[0]+(c.x||0),y:d.plotTop+b[1]-{high:.5,middle:.25,low:0}[c.align]*b[2]+(c.y||0)}}};h(k,"init",function(d,m,a){var k=m.angular,h=m.polar,w=a.isX,q=k&&w,l,C=m.options,f=a.pane||0;if(k){if(u(this,q?c:e),l=!w)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else h&&(u(this,
    e),this.defaultRadialOptions=(l=w)?this.defaultRadialXOptions:p(this.defaultYAxisOptions,this.defaultRadialYOptions));k||h?(this.isRadial=!0,m.inverted=!1,C.chart.zoomType=null):this.isRadial=!1;d.call(this,m,a);q||!k&&!h||(d=this.options,m.panes||(m.panes=[]),this.pane=m=m.panes[f]=m.panes[f]||new b(n(C.pane)[f],m,this),m=m.options,this.angleRad=(d.angle||0)*Math.PI/180,this.startAngleRad=(m.startAngle-90)*Math.PI/180,this.endAngleRad=(g(m.endAngle,m.startAngle+360)-90)*Math.PI/180,this.offset=d.offset||
    0,this.isCircular=l)});h(k,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});h(a,"getPosition",function(b,d,c,g,a){var e=this.axis;return e.getPosition?e.getPosition(c):b.call(this,d,c,g,a)});h(a,"getLabelPosition",function(b,d,c,a,e,k,n,h,q){var p=this.axis,l=k.y,f=20,r=k.align,u=(p.translate(this.pos)+p.startAngleRad+Math.PI/2)/Math.PI*180%360;p.isRadial?(b=p.getPosition(this.pos,p.center[2]/2+g(k.distance,-25)),"auto"===k.rotation?a.attr({rotation:u}):
null===l&&(l=p.chart.renderer.fontMetrics(a.styles.fontSize).b-a.getBBox().height/2),null===r&&(p.isCircular?(this.label.getBBox().width>p.len*p.tickInterval/(p.max-p.min)&&(f=0),r=u>f&&u<180-f?"left":u>180+f&&u<360-f?"right":"center"):r="center",a.attr({align:r})),b.x+=k.x,b.y+=l):b=b.call(this,d,c,a,e,k,n,h,q);return b});h(a,"getMarkPath",function(b,d,c,g,a,e,k){var n=this.axis;n.isRadial?(b=n.getPosition(this.pos,n.center[2]/2+g),d=["M",d,c,"L",b.x,b.y]):d=b.call(this,d,c,g,a,e,k);return d})})(x);
    (function(a){var f=a.each,r=a.noop,u=a.pick,l=a.Series,p=a.seriesType,q=a.seriesTypes;p("arearange","area",{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(b){return[b.low,
        b.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(b){var g=this.chart,d=this.xAxis.postTranslate(b.rectPlotX,this.yAxis.len-b.plotHigh);b.plotHighX=d.x-g.plotLeft;b.plotHigh=d.y-g.plotTop},translate:function(){var b=this,g=b.yAxis;q.area.prototype.translate.apply(b);f(b.points,function(b){var a=b.low,h=b.high,c=b.plotY;null===h||null===a?b.isNull=!0:(b.plotLow=c,b.plotHigh=g.translate(h,0,1,0,1))});this.chart.polar&&f(this.points,function(d){b.highToXY(d)})},getGraphPath:function(b){var g=
        [],d=[],a,h=q.area.prototype.getGraphPath,c,e,k;k=this.options;var v=k.step;b=b||this.points;for(a=b.length;a--;)c=b[a],c.isNull||k.connectEnds||b[a+1]&&!b[a+1].isNull||d.push({plotX:c.plotX,plotY:c.plotY,doCurve:!1}),e={polarPlotY:c.polarPlotY,rectPlotX:c.rectPlotX,yBottom:c.yBottom,plotX:u(c.plotHighX,c.plotX),plotY:c.plotHigh,isNull:c.isNull},d.push(e),g.push(e),c.isNull||k.connectEnds||b[a-1]&&!b[a-1].isNull||d.push({plotX:c.plotX,plotY:c.plotY,doCurve:!1});b=h.call(this,b);v&&(!0===v&&(v="left"),
        k.step={left:"right",center:"center",right:"left"}[v]);g=h.call(this,g);d=h.call(this,d);k.step=v;k=[].concat(b,g);this.chart.polar||"M"!==d[0]||(d[0]="L");this.graphPath=k;this.areaPath=this.areaPath.concat(b,d);k.isArea=!0;k.xMap=b.xMap;this.areaPath.xMap=b.xMap;return k},drawDataLabels:function(){var b=this.data,g=b.length,d,a=[],h=l.prototype,c=this.options.dataLabels,e=c.align,k=c.verticalAlign,v=c.inside,m,t,q=this.chart.inverted;if(c.enabled||this._hasPointLabels){for(d=g;d--;)if(m=b[d])t=
        v?m.plotHigh<m.plotLow:m.plotHigh>m.plotLow,m.y=m.high,m._plotY=m.plotY,m.plotY=m.plotHigh,a[d]=m.dataLabel,m.dataLabel=m.dataLabelUpper,m.below=t,q?e||(c.align=t?"right":"left"):k||(c.verticalAlign=t?"top":"bottom"),c.x=c.xHigh,c.y=c.yHigh;h.drawDataLabels&&h.drawDataLabels.apply(this,arguments);for(d=g;d--;)if(m=b[d])t=v?m.plotHigh<m.plotLow:m.plotHigh>m.plotLow,m.dataLabelUpper=m.dataLabel,m.dataLabel=a[d],m.y=m.low,m.plotY=m._plotY,m.below=!t,q?e||(c.align=t?"left":"right"):k||(c.verticalAlign=
        t?"bottom":"top"),c.x=c.xLow,c.y=c.yLow;h.drawDataLabels&&h.drawDataLabels.apply(this,arguments)}c.align=e;c.verticalAlign=k},alignDataLabel:function(){q.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:r,getSymbol:r,drawPoints:r})})(x);(function(a){var f=a.seriesType;f("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(x);(function(a){var f=a.defaultPlotOptions,r=a.each,u=a.merge,l=a.noop,p=a.pick,q=a.seriesType,b=a.seriesTypes.column.prototype;
        q("columnrange","arearange",u(f.column,f.arearange,{lineWidth:1,pointRange:null}),{translate:function(){var a=this,d=a.yAxis,n=a.xAxis,h=n.startAngleRad,c,e=a.chart,k=a.xAxis.isRadial,v;b.translate.apply(a);r(a.points,function(b){var t=b.shapeArgs,q=a.options.minPointLength,l,w;b.plotHigh=v=d.translate(b.high,0,1,0,1);b.plotLow=b.plotY;w=v;l=p(b.rectPlotY,b.plotY)-v;Math.abs(l)<q?(q-=l,l+=q,w-=q/2):0>l&&(l*=-1,w-=l);k?(c=b.barX+h,b.shapeType="path",b.shapeArgs={d:a.polarArc(w+l,w,c,c+b.pointWidth)}):
            (t.height=l,t.y=w,b.tooltipPos=e.inverted?[d.len+d.pos-e.plotLeft-w-l/2,n.len+n.pos-e.plotTop-t.x-t.width/2,l]:[n.left-e.plotLeft+t.x+t.width/2,d.pos-e.plotTop+w+l/2,l])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:l,crispCol:b.crispCol,drawPoints:b.drawPoints,drawTracker:b.drawTracker,getColumnMetrics:b.getColumnMetrics,animate:function(){return b.animate.apply(this,arguments)},polarArc:function(){return b.polarArc.apply(this,arguments)},pointAttribs:b.pointAttribs})})(x);
    (function(a){var f=a.each,r=a.isNumber,u=a.merge,l=a.pick,p=a.pInt,q=a.Series,b=a.seriesType,g=a.TrackerMixin;b("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var b=this.yAxis,a=this.options,g=b.center;
        this.generatePoints();f(this.points,function(c){var e=u(a.dial,c.dial),k=p(l(e.radius,80))*g[2]/200,v=p(l(e.baseLength,70))*k/100,m=p(l(e.rearLength,10))*k/100,t=e.baseWidth||3,q=e.topWidth||1,f=a.overshoot,w=b.startAngleRad+b.translate(c.y,null,null,null,!0);r(f)?(f=f/180*Math.PI,w=Math.max(b.startAngleRad-f,Math.min(b.endAngleRad+f,w))):!1===a.wrap&&(w=Math.max(b.startAngleRad,Math.min(b.endAngleRad,w)));w=180*w/Math.PI;c.shapeType="path";c.shapeArgs={d:e.path||["M",-m,-t/2,"L",v,-t/2,k,-q/2,k,
            q/2,v,t/2,-m,t/2,"z"],translateX:g[0],translateY:g[1],rotation:w};c.plotX=g[0];c.plotY=g[1]})},drawPoints:function(){var b=this,a=b.yAxis.center,g=b.pivot,c=b.options,e=c.pivot,k=b.chart.renderer;f(b.points,function(a){var g=a.graphic,e=a.shapeArgs,h=e.d,n=u(c.dial,a.dial);g?(g.animate(e),e.d=h):(a.graphic=k[a.shapeType](e).attr({rotation:e.rotation,zIndex:1}).addClass("highcharts-dial").add(b.group),a.graphic.attr({stroke:n.borderColor||"none","stroke-width":n.borderWidth||0,fill:n.backgroundColor||
    "#000000"}))});g?g.animate({translateX:a[0],translateY:a[1]}):(b.pivot=k.circle(0,0,l(e.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(a[0],a[1]).add(b.group),b.pivot.attr({"stroke-width":e.borderWidth||0,stroke:e.borderColor||"#cccccc",fill:e.backgroundColor||"#000000"}))},animate:function(b){var a=this;b||(f(a.points,function(b){var c=b.graphic;c&&(c.attr({rotation:180*a.yAxis.startAngleRad/Math.PI}),c.animate({rotation:b.shapeArgs.rotation},a.options.animation))}),a.animate=
        null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);q.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(b,a){q.prototype.setData.call(this,b,!1);this.processData();this.generatePoints();l(a,!0)&&this.chart.redraw()},drawTracker:g&&g.drawTrackerPoint},{setState:function(b){this.state=b}})})(x);(function(a){var f=a.each,r=a.noop,u=a.pick,l=a.seriesType,p=a.seriesTypes;l("boxplot",
        "column",{threshold:null,tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",
            pointAttribs:function(a){var b=this.options;a=a&&a.color||this.color;return{fill:b.fillColor||a,stroke:b.lineColor||a,"stroke-width":b.lineWidth||0}},drawDataLabels:r,translate:function(){var a=this.yAxis,b=this.pointArrayMap;p.column.prototype.translate.apply(this);f(this.points,function(g){f(b,function(b){null!==g[b]&&(g[b+"Plot"]=a.translate(g[b],0,1,0,1))})})},drawPoints:function(){var a=this,b=a.options,g=a.chart.renderer,d,n,h,c,e,k,v=0,m,t,l,p,w=!1!==a.doQuartiles,r,x=a.options.whiskerLength;
                f(a.points,function(f){var y=f.graphic,A=y?"animate":"attr",D=f.shapeArgs,z={},B={},E={},F=f.color||a.color;void 0!==f.plotY&&(m=D.width,t=Math.floor(D.x),l=t+m,p=Math.round(m/2),d=Math.floor(w?f.q1Plot:f.lowPlot),n=Math.floor(w?f.q3Plot:f.lowPlot),h=Math.floor(f.highPlot),c=Math.floor(f.lowPlot),y||(f.graphic=y=g.g("point").add(a.group),f.stem=g.path().addClass("highcharts-boxplot-stem").add(y),x&&(f.whiskers=g.path().addClass("highcharts-boxplot-whisker").add(y)),w&&(f.box=g.path(void 0).addClass("highcharts-boxplot-box").add(y)),
                    f.medianShape=g.path(void 0).addClass("highcharts-boxplot-median").add(y),z.stroke=f.stemColor||b.stemColor||F,z["stroke-width"]=u(f.stemWidth,b.stemWidth,b.lineWidth),z.dashstyle=f.stemDashStyle||b.stemDashStyle,f.stem.attr(z),x&&(B.stroke=f.whiskerColor||b.whiskerColor||F,B["stroke-width"]=u(f.whiskerWidth,b.whiskerWidth,b.lineWidth),f.whiskers.attr(B)),w&&(y=a.pointAttribs(f),f.box.attr(y)),E.stroke=f.medianColor||b.medianColor||F,E["stroke-width"]=u(f.medianWidth,b.medianWidth,b.lineWidth),f.medianShape.attr(E)),
                    k=f.stem.strokeWidth()%2/2,v=t+p+k,f.stem[A]({d:["M",v,n,"L",v,h,"M",v,d,"L",v,c]}),w&&(k=f.box.strokeWidth()%2/2,d=Math.floor(d)+k,n=Math.floor(n)+k,t+=k,l+=k,f.box[A]({d:["M",t,n,"L",t,d,"L",l,d,"L",l,n,"L",t,n,"z"]})),x&&(k=f.whiskers.strokeWidth()%2/2,h+=k,c+=k,r=/%$/.test(x)?p*parseFloat(x)/100:x/2,f.whiskers[A]({d:["M",v-r,h,"L",v+r,h,"M",v-r,c,"L",v+r,c]})),e=Math.round(f.medianPlot),k=f.medianShape.strokeWidth()%2/2,e+=k,f.medianShape[A]({d:["M",t,e,"L",l,e]}))})},setStackedPoints:r})})(x);
    (function(a){var f=a.each,r=a.noop,u=a.seriesType,l=a.seriesTypes;u("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:l.arearange?function(){var a=this.pointValKey;l.arearange.prototype.drawDataLabels.call(this);
        f(this.data,function(f){f.y=f[a]})}:r,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||l.column.prototype.getColumnMetrics.call(this)}})})(x);(function(a){var f=a.correctFloat,r=a.isNumber,u=a.pick,l=a.Point,p=a.Series,q=a.seriesType,b=a.seriesTypes;q("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},{pointValKey:"y",translate:function(){var a=this.options,d=this.yAxis,
        n,h,c,e,k,v,m,t,l,p=u(a.minPointLength,5),w=a.threshold,q=a.stacking;b.column.prototype.translate.apply(this);this.minPointLengthOffset=0;m=t=w;h=this.points;n=0;for(a=h.length;n<a;n++)c=h[n],v=this.processedYData[n],e=c.shapeArgs,l=(k=q&&d.stacks[(this.negStacks&&v<w?"-":"")+this.stackKey])?k[c.x].points[this.index+","+n]:[0,v],c.isSum?c.y=f(v):c.isIntermediateSum&&(c.y=f(v-t)),k=Math.max(m,m+c.y)+l[0],e.y=d.toPixels(k,!0),c.isSum?(e.y=d.toPixels(l[1],!0),e.height=Math.min(d.toPixels(l[0],!0),d.len)-
        e.y+this.minPointLengthOffset):c.isIntermediateSum?(e.y=d.toPixels(l[1],!0),e.height=Math.min(d.toPixels(t,!0),d.len)-e.y+this.minPointLengthOffset,t=l[1]):(e.height=0<v?d.toPixels(m,!0)-e.y:d.toPixels(m,!0)-d.toPixels(m-v,!0),m+=v),0>e.height&&(e.y+=e.height,e.height*=-1),c.plotY=e.y=Math.round(e.y)-this.borderWidth%2/2,e.height=Math.max(Math.round(e.height),.001),c.yBottom=e.y+e.height,e.height<=p&&(e.height=p,this.minPointLengthOffset+=p),e.y-=this.minPointLengthOffset,e=c.plotY+(c.negative?e.height:
            0)-this.minPointLengthOffset,this.chart.inverted?c.tooltipPos[0]=d.len-e:c.tooltipPos[1]=e},processData:function(b){var a=this.yData,n=this.options.data,h,c=a.length,e,k,l,m,t,q;k=e=l=m=this.options.threshold||0;for(q=0;q<c;q++)t=a[q],h=n&&n[q]?n[q]:{},"sum"===t||h.isSum?a[q]=f(k):"intermediateSum"===t||h.isIntermediateSum?a[q]=f(e):(k+=t,e+=t),l=Math.min(k,l),m=Math.max(k,m);p.prototype.processData.call(this,b);this.dataMin=l;this.dataMax=m},toYData:function(b){return b.isSum?0===b.x?null:"sum":
        b.isIntermediateSum?0===b.x?null:"intermediateSum":b.y},pointAttribs:function(a,d){var n=this.options.upColor;n&&!a.options.color&&(a.color=0<a.y?n:null);n=b.column.prototype.pointAttribs.call(this,a,d);delete n.dashstyle;return n},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var b=this.data,a=b.length,n=this.graph.strokeWidth()+this.borderWidth,n=Math.round(n)%2/2,h=[],c,e,k;for(k=1;k<a;k++)e=b[k].shapeArgs,c=b[k-1].shapeArgs,e=["M",c.x+c.width,c.y+n,"L",e.x,c.y+n],0>b[k-1].y&&
    (e[2]+=c.height,e[5]+=c.height),h=h.concat(e);return h},drawGraph:function(){p.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},getExtremes:a.noop},{getClassName:function(){var b=l.prototype.getClassName.call(this);this.isSum?b+=" highcharts-sum":this.isIntermediateSum&&(b+=" highcharts-intermediate-sum");return b},isValid:function(){return r(this.y,!0)||this.isSum||this.isIntermediateSum}})})(x);(function(a){var f=a.Series,r=a.seriesType,u=a.seriesTypes;r("polygon","scatter",
        {marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=f.prototype.getGraphPath.call(this),p=a.length+1;p--;)(p===a.length||"M"===a[p])&&0<p&&a.splice(p,0,"z");return this.areaPath=a},drawGraph:function(){this.options.fillColor=this.color;u.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:f.prototype.drawTracker,setStackedPoints:a.noop})})(x);
    (function(a){var f=a.arrayMax,r=a.arrayMin,u=a.Axis,l=a.color,p=a.each,q=a.isNumber,b=a.noop,g=a.pick,d=a.pInt,n=a.Point,h=a.Series,c=a.seriesType,e=a.seriesTypes;c("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}}},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,
        zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",pointAttribs:function(b,a){var c=g(this.options.marker.fillOpacity,.5),d=h.prototype.pointAttribs.call(this,b,a);1!==c&&(d.fill=l(d.fill).setOpacity(c).get("rgba"));return d},getRadii:function(b,a,c,d){var e,g,h,n=this.zData,f=[],l=this.options,p="width"!==l.sizeBy,q=l.zThreshold,r=a-b;g=0;for(e=n.length;g<e;g++)h=n[g],l.sizeByAbsoluteValue&&null!==
    h&&(h=Math.abs(h-q),a=Math.max(a-q,Math.abs(b-q)),b=0),null===h?h=null:h<b?h=c/2-1:(h=0<r?(h-b)/r:.5,p&&0<=h&&(h=Math.sqrt(h)),h=Math.ceil(c+h*(d-c))/2),f.push(h);this.radii=f},animate:function(b){var a=this.options.animation;b||(p(this.points,function(b){var c=b.graphic;b=b.shapeArgs;c&&b&&(c.attr("r",1),c.animate({r:b.r},a))}),this.animate=null)},translate:function(){var b,a=this.data,c,d,g=this.radii;e.scatter.prototype.translate.call(this);for(b=a.length;b--;)c=a[b],d=g?g[b]:0,q(d)&&d>=this.minPxSize/
    2?(c.shapeType="circle",c.shapeArgs={x:c.plotX,y:c.plotY,r:d},c.dlBox={x:c.plotX-d,y:c.plotY-d,width:2*d,height:2*d}):c.shapeArgs=c.plotY=c.dlBox=void 0},drawLegendSymbol:function(b,a){var c=this.chart.renderer,d=c.fontMetrics(b.itemStyle.fontSize).f/2;a.legendSymbol=c.circle(d,b.baseline-d,d).attr({zIndex:3}).add(a.legendGroup);a.legendSymbol.isMarker=!0},drawPoints:e.column.prototype.drawPoints,alignDataLabel:e.column.prototype.alignDataLabel,buildKDTree:b,applyZones:b},{haloPath:function(){return n.prototype.haloPath.call(this,
        this.shapeArgs.r+this.series.options.states.hover.halo.size)},ttBelow:!1});u.prototype.beforePadding=function(){var b=this,a=this.len,c=this.chart,e=0,h=a,n=this.isXAxis,l=n?"xData":"yData",u=this.min,x={},C=Math.min(c.plotWidth,c.plotHeight),y=Number.MAX_VALUE,A=-Number.MAX_VALUE,D=this.max-u,z=a/D,B=[];p(this.series,function(a){var e=a.options;!a.bubblePadding||!a.visible&&c.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,B.push(a),n&&(p(["minSize","maxSize"],function(b){var a=e[b],c=/%$/.test(a),
        a=d(a);x[b]=c?C*a/100:a}),a.minPxSize=x.minSize,a.maxPxSize=x.maxSize,a=a.zData,a.length&&(y=g(e.zMin,Math.min(y,Math.max(r(a),!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),A=g(e.zMax,Math.max(A,f(a))))))});p(B,function(a){var c=a[l],d=c.length,g;n&&a.getRadii(y,A,a.minPxSize,a.maxPxSize);if(0<D)for(;d--;)q(c[d])&&b.dataMin<=c[d]&&c[d]<=b.dataMax&&(g=a.radii[d],e=Math.min((c[d]-u)*z-g,e),h=Math.max((c[d]-u)*z+g,h))});B.length&&0<D&&!this.isLog&&(h-=a,z*=(a+e-h)/a,p([["min","userMin",e],
        ["max","userMax",h]],function(a){void 0===g(b.options[a[0]],b[a[1]])&&(b[a[0]]+=a[2]/z)}))}})(x);(function(a){function f(b,a){var d=this.chart,n=this.options.animation,h=this.group,c=this.markerGroup,e=this.xAxis.center,k=d.plotLeft,f=d.plotTop;d.polar?d.renderer.isSVG&&(!0===n&&(n={}),a?(d={translateX:e[0]+k,translateY:e[1]+f,scaleX:.001,scaleY:.001},h.attr(d),c&&c.attr(d)):(d={translateX:k,translateY:f,scaleX:1,scaleY:1},h.animate(d,n),c&&c.animate(d,n),this.animate=null)):b.call(this,a)}var r=
        a.each,u=a.pick,l=a.seriesTypes,p=a.wrap,q=a.Series.prototype;a=a.Pointer.prototype;q.searchPointByAngle=function(b){var a=this.chart,d=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(b.chartX-d[0]-a.plotLeft,b.chartY-d[1]-a.plotTop)})};p(q,"buildKDTree",function(b){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.kdDimensions=2);b.apply(this)});q.toXY=function(b){var a,d=this.chart,n=b.plotX;a=b.plotY;b.rectPlotX=n;b.rectPlotY=a;
        a=this.xAxis.postTranslate(b.plotX,this.yAxis.len-a);b.plotX=b.polarPlotX=a.x-d.plotLeft;b.plotY=b.polarPlotY=a.y-d.plotTop;this.kdByAngle?(d=(n/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>d&&(d+=360),b.clientX=d):b.clientX=b.plotX};l.spline&&p(l.spline.prototype,"getPointSpline",function(a,g,d,n){var h,c,e,k,f,m,l;this.chart.polar?(h=d.plotX,c=d.plotY,a=g[n-1],e=g[n+1],this.connectEnds&&(a||(a=g[g.length-2]),e||(e=g[1])),a&&e&&(k=a.plotX,f=a.plotY,g=e.plotX,m=e.plotY,k=(1.5*h+k)/2.5,f=
        (1.5*c+f)/2.5,e=(1.5*h+g)/2.5,l=(1.5*c+m)/2.5,g=Math.sqrt(Math.pow(k-h,2)+Math.pow(f-c,2)),m=Math.sqrt(Math.pow(e-h,2)+Math.pow(l-c,2)),k=Math.atan2(f-c,k-h),f=Math.atan2(l-c,e-h),l=Math.PI/2+(k+f)/2,Math.abs(k-l)>Math.PI/2&&(l-=Math.PI),k=h+Math.cos(l)*g,f=c+Math.sin(l)*g,e=h+Math.cos(Math.PI+l)*m,l=c+Math.sin(Math.PI+l)*m,d.rightContX=e,d.rightContY=l),n?(d=["C",a.rightContX||a.plotX,a.rightContY||a.plotY,k||h,f||c,h,c],a.rightContX=a.rightContY=null):d=["M",h,c]):d=a.call(this,g,d,n);return d});
        p(q,"translate",function(a){var g=this.chart;a.call(this);if(g.polar&&(this.kdByAngle=g.tooltip&&g.tooltip.shared,!this.preventPostTranslate))for(a=this.points,g=a.length;g--;)this.toXY(a[g])});p(q,"getGraphPath",function(a,g){var d=this,f,h;if(this.chart.polar){g=g||this.points;for(f=0;f<g.length;f++)if(!g[f].isNull){h=f;break}!1!==this.options.connectEnds&&void 0!==h&&(this.connectEnds=!0,g.splice(g.length,0,g[h]));r(g,function(a){void 0===a.polarPlotY&&d.toXY(a)})}return a.apply(this,[].slice.call(arguments,
            1))});p(q,"animate",f);l.column&&(l=l.column.prototype,l.polarArc=function(a,g,d,f){var h=this.xAxis.center,c=this.yAxis.len;return this.chart.renderer.symbols.arc(h[0],h[1],c-g,null,{start:d,end:f,innerR:c-u(a,c)})},p(l,"animate",f),p(l,"translate",function(a){var g=this.xAxis,d=g.startAngleRad,f,h,c;this.preventPostTranslate=!0;a.call(this);if(g.isRadial)for(f=this.points,c=f.length;c--;)h=f[c],a=h.barX+d,h.shapeType="path",h.shapeArgs={d:this.polarArc(h.yBottom,h.plotY,a,a+h.pointWidth)},this.toXY(h),
            h.tooltipPos=[h.plotX,h.plotY],h.ttBelow=h.plotY>g.center[1]}),p(l,"alignDataLabel",function(a,g,d,f,h,c){this.chart.polar?(a=g.rectPlotX/Math.PI*180,null===f.align&&(f.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===f.verticalAlign&&(f.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),q.alignDataLabel.call(this,g,d,f,h,c)):a.call(this,g,d,f,h,c)}));p(a,"getCoordinates",function(a,f){var d=this.chart,l={xAxis:[],yAxis:[]};d.polar?r(d.axes,function(a){var b=a.isXAxis,e=
            a.center,k=f.chartX-e[0]-d.plotLeft,e=f.chartY-e[1]-d.plotTop;l[b?"xAxis":"yAxis"].push({axis:a,value:a.translate(b?Math.PI-Math.atan2(k,e):Math.sqrt(Math.pow(k,2)+Math.pow(e,2)),!0)})}):l=a.call(this,f);return l})})(x)});