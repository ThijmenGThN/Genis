/*!
 * chartjs-plugin-annotation.js
 * http://chartjs.org/
 * Version: 0.2.0
 *
 * Copyright 2016 Evert Timberg
 * Released under the MIT license
 * https://github.com/chartjs/Chart.Annotation.js/blob/master/LICENSE.md
 */
!function t(o,e,r){function n(i,s){if(!e[i]){if(!o[i]){var f="function"==typeof require&&require;if(!s&&f)return f(i,!0);if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[i]={exports:{}};o[i][0].call(u.exports,function(t){var e=o[i][1][t];return n(e?e:t)},u,u.exports,t,o,e,r)}return e[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)n(r[i]);return n}({1:[function(t,o,e){},{}],2:[function(t,o,e){o.exports=function(t){function o(t){return!isNaN(t)&&isFinite(t)}function e(t,e,r){var n,a,i=t._model=t._model||{},s=r.scales[e.xScaleID],f=r.scales[e.yScaleID],l=r.chartArea,u=l.left,d=l.top,c=l.right,h=l.bottom;s&&(n=o(e.xMin)?s.getPixelForValue(e.xMin):l.left,a=o(e.xMax)?s.getPixelForValue(e.xMax):l.right,u=Math.min(n,a),c=Math.max(n,a)),f&&(n=o(e.yMin)?f.getPixelForValue(e.yMin):l.bottom,a=o(e.yMax)?f.getPixelForValue(e.yMax):l.top,d=Math.min(n,a),h=Math.max(n,a)),i.left=u,i.top=d,i.right=c,i.bottom=h,i.borderColor=e.borderColor,i.borderWidth=e.borderWidth,i.backgroundColor=e.backgroundColor}var r=t.Element.extend({draw:function(t){var o=this._view;t.lineWidth=o.borderWidth,t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor;var e=o.right-o.left,r=o.bottom-o.top;t.fillRect(o.left,o.top,e,r),t.strokeRect(o.left,o.top,e,r)}});return{Constructor:r,update:e}}},{}],3:[function(t,o,e){function r(t,o,e){var r=o.options.annotation;if(r.drawTime==t){var n=o._annotationObjects;if(i(n)){var a=o.chart.ctx;n.forEach(function(t){t.transition(e).draw(a)})}}}var n=t("chart.js");n="function"==typeof n?n:window.Chart;var a=n.helpers,i=a.isArray;n.Annotation=n.Annotation||{};var s=(n.Annotation.defaults={drawTime:"afterDraw",annotations:[]},t("./line.js")(n)),f=t("./box.js")(n),l=n.Annotation.annotationTypes={line:s.Constructor,box:f.Constructor},u=n.Annotation.updateFunctions={line:s.update,box:f.update},d=(n.Annotation.drawTimeOptions={afterDraw:"afterDraw",afterDatasetsDraw:"afterDatasetsDraw",beforeDatasetsDraw:"beforeDatasetsDraw"},{beforeInit:function(t){var o=t.options;o.annotation=a.configMerge(n.Annotation.defaults,o.annotation);var e=o.annotation.annotations;if(i(e)){var r=t._annotationObjects=[];e.forEach(function(t,o){var e=l[t.type];e&&r.push(new e({_index:o}))})}},afterScaleUpdate:function(t){var o=t._annotationObjects,e=t.options.annotation;i(o)&&o.forEach(function(o,r){var n=e.annotations[o._index],a=u[n.type];a&&a(o,n,t)})},afterDraw:function(t,o){r(n.Annotation.drawTimeOptions.afterDraw,t,o)},afterDatasetsDraw:function(t,o){r(n.Annotation.drawTimeOptions.afterDatasetsDraw,t,o)},beforeDatasetsDraw:function(t,o){r(n.Annotation.drawTimeOptions.beforeDatasetsDraw,t,o)}});o.exports=d,n.pluginService.register(d)},{"./box.js":2,"./line.js":4,"chart.js":1}],4:[function(t,o,e){o.exports=function(t){function o(t){return!isNaN(t)&&isFinite(t)}function e(t,e,n){var a=t._model=t._model||{},i=n.scales[e.scaleID],s=i?i.getPixelForValue(e.value):NaN,f=i&&o(e.endValue)?i.getPixelForValue(e.endValue):NaN;isNaN(f)&&(f=s);var l=n.chartArea;isNaN(s)||(e.mode==r?(a.x1=l.left,a.x2=l.right,a.y1=s,a.y2=f):(a.y1=l.top,a.y2=l.bottom,a.x1=s,a.x2=f)),a.borderColor=e.borderColor,a.borderWidth=e.borderWidth,a.borderDash=e.borderDash||[],a.borderDashOffset=e.borderDashOffset||0}var r="horizontal",n=t.Element.extend({draw:function(t){var o=this._view;t.save(),t.lineWidth=o.borderWidth,t.strokeStyle=o.borderColor,t.setLineDash&&t.setLineDash(o.borderDash),t.lineDashOffset=o.borderDashOffset,t.beginPath(),t.moveTo(o.x1,o.y1),t.lineTo(o.x2,o.y2),t.stroke(),t.restore()}});return{Constructor:n,update:e}}},{}]},{},[3]);