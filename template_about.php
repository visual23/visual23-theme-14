<?php
/*
Template name: About
*/

$template_url = get_bloginfo( 'template_url' );
$site_url = get_bloginfo( 'url' );

?>
<?php get_header() ?>
<?php

require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;

?>
<div id="topLeaves"></div>
        <div id="leftLeaves"></div>

        <div id="introSectionSpace"></div>
        <section class="slice" id="aboutSection">
            <div class="container">
                <div class="row">
                    <?php
                    $my_id = 19;
                    $post_id_19 = get_post($my_id);
                    $content = $post_id_19->post_content;
                    $content = apply_filters('the_content', $content);
                    $content = str_replace(']]>', ']]>', $content);
                    echo $content;
                    ?>
                </div>
            </div>
        </section>

        <section id="mountainSceneWrapper">
            <div id="bird1"></div>
            <div id="bird2"></div>
            <div class="mountain" id="mtn1"></div>
            <div class="mountain" id="mtn2"></div>
            <div class="mountain" id="mtn3"></div>
            <div class="mountain" id="mtn4"></div>
            <div class="mountain" id="mtn5"></div>
            <div class="mountain" id="mtn6"></div>
            <div class="mountain" id="mtn7"></div>
            <div class="mountain" id="mtn8"></div>
            <div class="mountain" id="mtn9"></div>
            <div class="mountain" id="mtn10"></div>
        </section>

       

<?php get_footer() ?>

<!-- add page specific js here --> 
</body>
</html>