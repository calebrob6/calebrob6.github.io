---
title: "Understanding intersection-over-union"
date: 2018-09-11 00:00:00 -0800
permalink: /ml/2018/09/11/understanding-iou.html
tags:
  - ml
---

Intersection-over-union (IoU), also known as the Jaccard index, is a commonly used measure for determining how accurate a proposed image segmentation is, compared to a known/ground-truth segmentation. In segmentation tasks the IoU is prefered over accuracy as it is not as affected by the class imblances that are inherent in foreground/background segmentation tasks. As an example, if a ground truth image is made up of 90% background pixels, a proposed segmentation that classifies all pixels as "background" will have an accuracy of 90% whereas it would have an IoU of 0%. The definition of IoU between a known segmentation of $$n$$ pixels, $$Y$$, and a similar set of predicted segmentation, $$\hat{Y}$$ (in the binary case, i.e. where $$Y_i, \hat{Y}_i \in \{0,1\}, \forall i \in [1,n]$$) is as follows:
 
$$
IoU(Y, \hat{Y}) = \frac{Y \cap \hat{Y}}{Y \cup \hat{Y}} = \frac{\sum_{i=1}^n \min(Y_i, \hat{Y}_i)}{\sum_{i=1}^n \max(Y_i, \hat{Y}_i)} 
$$ 

Written as a function of the confusion matrix between $$Y$$ and $$\hat{Y}$$:

$$
\begin{array}{|c|c|c|c|}
\hline
& \hat{Y}=1 & \hat{Y}=0\\ \hline
Y=1 & \text{TP} & \text{FN}\\ \hline
Y=0 & \text{FP} & \text{TN}\\ \hline
\end{array}
$$

where ($$\text{TP} = \text{True positives}, \text{FP} = \text{False positives}$$, etc.), IoU is:

$$
IoU(Y, \hat{Y}) = \frac{TP}{TP + FN + FP} 
$$


As the IoU can range from 0 to 1, it is usually expressed as a percent, however the intuition behind what an IoU score _means_ in terms of visual error is not intuitive (to me atleast). How much better is an IoU score of 0.9 than an IoU score of 0.8 (in terms of accuracy, this difference would mean 10% more observations were correctly classified)? This problem is excacerbated as there can be many segmentations that correspond to a particular IoU score.

To get a better feel for how IoU changes with different segmentations I created the interactive tool below. You can move and resize the "ground truth" and "predicted" segmentations to see how the IoU changes; the intersection between the two will be highlighted in green. As a challenge, try to make several segmentation pairs that all match up to 0.8. While attempting this you should get a better feel for the meaning of IoU!

<div id="divIoU" style="text-align:center;">IoU(Ground Truth, Predicted)=0.00</div>
<div id="container" style="text-align:center;">
  <div id="containment">
      <div id="divGroundTruth">Ground Truth</div>
      <div id="divPredicted">Predicted</div>
      <div id="divOverlay"></div>
  </div>
</div>

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript">
function recalculate(event, ui){
  var div1 = $("#divGroundTruth");
  var div2 = $("#divPredicted");
  var overlay = $("#divOverlay")

  var l1=div1.offset().left;
  var t1=div1.offset().top;
  var w1=div1.width();
  var h1=div1.height();

  var l2=div2.offset().left;
  var t2=div2.offset().top;
  var w2=div2.width();
  var h2=div2.height();    

  var top = Math.max(t1,t2);
  var left = (l2>=l1 && l2<=(l1+w1)) ? l2 : (l1>=l2 && l1<=(l2+w2)) ? l1 : 0;
  var width = Math.max(Math.min(l1+w1,l2+w2) - Math.max(l1,l2),0);
  var height = Math.max(Math.min(t1+h1,t2+h2) - Math.max(t1,t2),0);

  var intersection = width * height;
  var union = (w1 * h1) + (w2 * h2) - intersection;
  var iou = intersection / union;
  var rounded = Math.round(iou * 100) / 100;

  //console.debug(intersection, union);
  //console.debug(top, left, width, height);

  if(width!=0 && height!=0 && left!=0){
    $("#divIoU").html("IoU(Ground Truth, Predicted)=" + rounded);
    overlay.css({'top': top, 'left': left, 'width': width, 'height': height, 'display': 'block'});
  }else{
    $("#divIoU").html("IoU(Ground Truth, Predicted)=0");
    overlay.css("display", "none");
  }

}

     
$("#containment").css({
  "display": "inline-block",
  "border": "1px solid black",
  "width": "400px",
  "height": "400px"
});

$("#divGroundTruth")
  .css({
    "background-color":"blue",
    "color": "white",
    "display": "block",
    "width": "80px",
    "height": "120px",
    "position": "absolute",
  })
  .resizable({
    maxWidth: 150,
    maxHeight: 225,
    minWidth: 50,
    minHeight: 100,
    containment: "#containment",
    resize: recalculate
  })
  .draggable({
    containment: "parent",
    drag: recalculate
  });

$("#divPredicted")
  .css({
    "background-color":"yellow",
    "color": "black",
    "display": "block",
    "width": "80px",
    "height": "120px",
    "position": "relative",
    "top": "120px",
    "left": "80px"
  })
  .resizable({
    maxWidth: 150,
    maxHeight: 225,
    minWidth: 50,
    minHeight: 100,
    containment: "#containment",
    resize: recalculate
  })
  .draggable({
    containment: "parent",
    drag: recalculate
  });

$("#divOverlay")
  .css({
    "background-color":"green",
    "display": "block",
    "width": "80px",
    "height": "120px",
    "position": "absolute",
    "display": "none"
  });

</script>
