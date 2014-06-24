<?php

$template_url = get_bloginfo( 'template_url' );
$site_url = get_bloginfo( 'url' );

?>
<?php get_header() ?>

<section id="introSection">
           <!-- Carousel
            ================================================== -->
            <div id="myCarouselShort" class="carousel slide carousel-fade" data-ride="carousel">
              <div class="carousel-inner">
                <div class="item active carousel-image" style="background-image:url('<?php
 
$rows = get_field('photos', 'options');
$row_count = count($rows);
$i = rand(0, $row_count - 1);

$image = $rows[ $i ]['photo'];
$carousel_short_size = 'carousel-short';
$carousel_short = $image['sizes'][ $carousel_short_size ];
$carousel_short_width = $image['sizes'][ $carousel_short_size . '-width' ];
$carousel_short_height = $image['sizes'][ $carousel_short_size . '-height' ]; 

echo $carousel_short;
 
?>');">                
                </div>
              </div>
            </div><!-- /.carousel -->
        </section>

<section class="slice" id="pressSection">
            <div class="container">
                <div class="row">
                <h1 class="sectionTitle">
                     <span class="left">&nbsp;</span>
                     <span class="center">PRESS</span>
                     <span class="right">&nbsp;</span>
                 </h1>
                <div class="blogDetail">
                    <div class="col-md-9 col-sm-9 col-centered">
                         <?php if( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                        <h1><?php echo get_the_title(); ?></h1>
                        <?php echo get_field('full_press_story'); ?>
                        <?php endwhile; ?>
                        <?php endif; ?>
                        
                        <div class="row">
                        <a class="view_more_blog" href="<?php echo esc_url( home_url( '/' ) ); ?>press/">Back To Press</a>
                       </div>
                    
                    </div>
                    <div class="clearfix"></div>                    
                    </div>
                </div>
            </div>
        </section>
   
    
<?php get_footer() ?>

<!-- add page specific js here --> 

</body>
</html>