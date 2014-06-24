<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the id=main div and all content after
 *
 * @package visual23
 */
?>


<!-- Start Content -->


<section class="slice" id="contactSection">
            <div id="footerChickensAudio"></div>
            <div id="footerChickens"></div>
            <div class="container">
                    <h1>Help feed my chickens.</h1>
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row">
                                <form method="post" action="<?php echo get_template_directory_uri(); ?>/includes/js-plugin/neko-contact-ajax-plugin/php/form-handler.php" id="contactfrm">
                                    <div class="col-md-6">
                                        <label for="name"></label>
                                        <input type="text" name="name" id="name" placeholder="Name" title="Please enter your name (at least 2 characters)" />
                                        <label for="email"></label>
                                        <input type="email" name="email" id="email" placeholder="Email" title="Please enter a valid email address" />
                                        <label for="phone"></label>
                                        <input name="phone" type="tel" id="phone" size="30" value="" placeholder="Phone Number" class="required digits" title="Please enter a valid phone number (at least 10 characters)">
                                    </div>
                                    <div class="col-md-6 text-right">
                                        <label for="comments"></label>
                                        <textarea name="comment" id="comments" cols="3" rows="5" placeholder="How can I help you?" title="Please enter your message (at least 10 characters)"></textarea>
                                        <div class="result"></div>
                                        <button name="submit" type="submit" class="btn contactBtn" id="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <address>
                                <p>
                                    <a href="mailto:hello@visual23.com">hello@visual23.com</a>
                                    <br>828.225.6670
                                    <br>Asheville, NC</p>
                                <p>Oh, and if you're not an agency and want some work like what you see here, contact me anyway. I have a network of professionals and can help pull together the right team for the job.</p>
                            </address>
                        </div>
                    </div>
                    <div class="footerText">
                        <p>&copy; <?php echo date('Y'); ?> Visual23 - Made with &hearts; in Asheville</p>
                    </div>
            </div>
        </section>
    </div>
<?php 

    if ( !is_mobile() || !is_tablet() ) {
?>  
    <audio id="chickenAudio">
        <source src="<?php echo get_template_directory_uri(); ?>/includes/audio/rooster.ogg" type="audio/ogg">
        <source src="<?php echo get_template_directory_uri(); ?>/includes/audio/rooster.mpg" type="audio/mpeg">
    </audio>
<?php 
    }
?>

    
    <!-- global wrapper --> 


<?php wp_footer(); ?>

</body>
</html>