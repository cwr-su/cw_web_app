
document.querySelector('.openFaqAnswerBtn1').addEventListener('click', (event) => {
    if (document.querySelector('.faqAns2').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn2').classList.remove('rotated');
        document.querySelector('.faqAns2').classList.remove('active');
    } else if (document.querySelector('.faqAns3').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn3').classList.remove('rotated');
        document.querySelector('.faqAns3').classList.remove('active');
    } else if (document.querySelector('.faqAns4').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn4').classList.remove('rotated');
        document.querySelector('.faqAns4').classList.remove('active');
    }
    document.querySelector('.faqAns1').classList.toggle('active');
    document.querySelector('.openFaqAnswerBtn1').classList.toggle('rotated');
});

document.querySelector('.openFaqAnswerBtn2').addEventListener('click', (event) => {
    if (document.querySelector('.faqAns1').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn1').classList.remove('rotated');
        document.querySelector('.faqAns1').classList.remove('active');
    } else if (document.querySelector('.faqAns3').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn3').classList.remove('rotated');
        document.querySelector('.faqAns3').classList.remove('active');
    } else if (document.querySelector('.faqAns4').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn4').classList.remove('rotated');
        document.querySelector('.faqAns4').classList.remove('active');
    }
    document.querySelector('.faqAns2').classList.toggle('active');
    document.querySelector('.openFaqAnswerBtn2').classList.toggle('rotated');
});

document.querySelector('.openFaqAnswerBtn3').addEventListener('click', (event) => {
    if (document.querySelector('.faqAns2').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn2').classList.remove('rotated');
        document.querySelector('.faqAns2').classList.remove('active');
    } else if (document.querySelector('.faqAns1').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn1').classList.remove('rotated');
        document.querySelector('.faqAns1').classList.remove('active');
    } else if (document.querySelector('.faqAns4').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn4').classList.remove('rotated');
        document.querySelector('.faqAns4').classList.remove('active');
    }
    document.querySelector('.faqAns3').classList.toggle('active');
    document.querySelector('.openFaqAnswerBtn3').classList.toggle('rotated');
});

document.querySelector('.openFaqAnswerBtn4').addEventListener('click', (event) => {
    if (document.querySelector('.faqAns2').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn2').classList.remove('rotated');
        document.querySelector('.faqAns2').classList.remove('active');
    } else if (document.querySelector('.faqAns1').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn1').classList.remove('rotated');
        document.querySelector('.faqAns1').classList.remove('active');
    } else if (document.querySelector('.faqAns3').classList.contains('active')) {
        document.querySelector('.openFaqAnswerBtn3').classList.remove('rotated');
        document.querySelector('.faqAns3').classList.remove('active');
    }
    document.querySelector('.faqAns4').classList.toggle('active');
    document.querySelector('.openFaqAnswerBtn4').classList.toggle('rotated');
});