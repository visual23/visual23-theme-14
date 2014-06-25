<?php
/*
Template name: Front
*/
?>
<?php get_header() ?>

<div id="topLeaves"></div>
        <div id="leftLeaves"></div>

        <section id="introSection">
            <div class="container">
                <div class="row">
                     <div class="col-md-5 col-sm-6 introText">
                        <?php

                         if( get_field( 'home_intro') ){
                            $row_count = 0;	
                            while( the_repeater_field( 'home_intro') ){
                                echo '<div id="line'.$row_count.'">'.get_sub_field( 'intro_line').'</div>';
                                $row_count++;
                            }
                          }
                       ?>
                    </div>
                    <?php 
 
                    $rows = get_field('random_project' ); // get all the rows
                    $rand_row = $rows[ array_rand( $rows ) ]; // get the first row
                    $rand_row_devices_image = $rand_row['devices' ]; // get the sub field value 
                    $devices_image = wp_get_attachment_image_src( $rand_row_devices_image, 'full' );

                    ?>

                    <div class="col-md-7 col-sm-6 devices text-right">
                        <img src="<?php echo $devices_image[0]; ?>" />
                    </div>
                </div>
            </div>
        </section>
        <div id="introSectionSpace"></div>
        <section class="slice" id="aboutSection">
            <div class="container">
                    <?php
                    $my_id = 19;
                    $post_id_19 = get_post($my_id);
                    $content = $post_id_19->post_content;
                    $content = apply_filters('the_content', $content);
                    $content = str_replace(']]>', ']]>', $content);
                    echo $content;
                    ?>
            </div>
        </section>

        <section id="mountainSceneWrapper">
            <div id="bird1"><a href="#"></a></div>
            <div id="bird2"><a href="#"></a></div>
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

        <section class="slice" id="workSection" >
            <div class="container">
                <h1>I worked on these projects.</h1>
            <div id="workGridHolder">
                <ul id="og-grid" class="og-grid">
                   <?php 
	  $the_link = "";
		$posts_per_page = 22;
		
wp_reset_query();
$args=array(
  'post_type' => 'work',
  'post_status' => 'publish',
  'orderby'   => 'menu_order',
  'order'     => 'ASC',
  'meta_key' => 'is_active',
  'meta_value' => 1,
  'posts_per_page'=> $posts_per_page,
);
$my_query = null;
$my_query = new WP_Query($args);

if( $my_query->have_posts() ) { 
        
  while ($my_query->have_posts()) : $my_query->the_post(); 
    $my_custom_fields = get_fields(get_the_ID());
//echo $my_custom_fields[ 'is_top_story' ];
  //  if($my_custom_fields[ 'is_active' ])
	//{
    $large_images = "";
    $last = count(get_field('large_images'));
    $x=1;
    while( the_repeater_field( 'large_images') ){
        if ($x != $last)
        {
            $large_images .= get_sub_field( 'image').',';
        }
        else
        {
            $large_images .= get_sub_field( 'image');
        }
        $x++;
    }


    echo '<li>';
    echo '<a class="thumbnailLink" href="'.get_field('project_link').'" data-slug="'.$post->post_name.'" data-largesrc="'.$large_images.'" data-title="'.get_the_title($ID).'" data-what="'.get_field('what_i_did').'" data-description="'.get_field('project_description').'" data-client="'.get_field('client_name').'" data-agency="'.get_field('agency_name').'">';
    echo '<div class="thumbnailInfoWrapper">';
    echo '<div class="thumbnailInfo">';
    echo '<div class="thumbnailProjectTitle">'.get_the_title($ID).'</div>';
    echo '<div class="thumbnailProjectDetails">'.get_field('what_i_did').'</div>';
    echo '</div>';
    echo '</div>';
    echo '<div class="workThumbnail">';
    echo '<div class="thumbnailFader"></div>';
    echo '<img src="'.get_field('small_image').'" alt="'.get_field('project_title').'" title="'.get_the_title($ID).'" />';
    echo '</div>';                     
    echo ' </a>';
    echo '</li>';
			
	//}
endwhile;

		}
wp_reset_query();
	  ?>
                    
                </ul>
                    </div>
            </div>
        </section>

<?php get_footer() ?>