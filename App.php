<?php

## this class is the main App control | It extends an abstract class Super ##

error_reporting(0);

class App extends Super {
    
       private $access = NULL;
      
       public function __construct()
       {
                
                //set accessors
                require_once('class/Accessors.php');
                $this->access = new Accessors($this->session, $this->input);
                
                //for session and cookie if user is new
                //set configuration if user data is found in cookie for remember me
                $this->access->set_app_config();
             

        }

        public function AssessReport()
        {

            //fetch company unique code from session
            $company_code = $this->access->getCompanyCode();
            
            //return user id from session
            $userid = $this->access->getUserID();

            //
            $taken_assess = $this->access->getMyAssessments($userid);
            
            if(is_array($taken_assess)){
                  //array to hold assessment data
                  $assessmentDataHolder = array();

                  foreach ($taken_assess as $key => $value) {
                      $assessment_id = $value['assessment_id'];
                      //fetch and assign assessment category to value
                      $value['assessment_category'] = $this->access->getAssessments($assessment_id);

                      //get total number of value in  each assessment; 0 if none
                      $value['question_count'] = sizeof($this->access->getAssessmentQuestions($assessment_id));

                      //store updated value in assessmentDataHolder
                      $assessmentDataHolder[] = $value;
                  }

              }
            //pack of all assessments taken
            //$assessmentDataHolder;

        }

        public function Courses()
        {

          $mycourses = $this->access->getMyCourses($this->access->getUserID());

          $courses = array();

          //check if variable has value
          if(is_array($mycourses))
          {
            //get details of assessments that was added
            foreach ($mycourses as $key => $value) {
                //get each course id in order to fetch course details
                $course_id = $value['course_id'];
                $courses[] = $this->access->getCourses($course_id);
            }
          }

          //log courses into array 
          //$courses;

        }

        public function AllCourses()
        {
            //insert code to get all courses available here
        }



        public function Profile()
        {
            //insert code to get user profile information here 
        }

        public function Settings()
        {
          //app settings
        }


  }


?>