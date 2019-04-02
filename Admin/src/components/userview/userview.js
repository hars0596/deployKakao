import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from "@material-ui/core/Tooltip";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Avatar from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import { fetchUserProfileByID,fetchLocations,fetchProfessional,fetchUniversity,fetchCompanies,fetchCourses } from "../actions/formactions";
import moment from "moment";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
// import { List, ListItem } from "material-ui/List";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },

  },

  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },

  },

  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

// const ExpansionPanelDetails = withStyles(theme => ({
//   root: {
//     padding: theme.spacing.unit * 2,
//   },

// }))(MuiExpansionPanelDetails);


const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
});

 class UserView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: 'panel1',
      open: false,
      Data: [],
      Locations:[],
      Professional: [],
      University:[],
      Companies:[],
      Courses:[]
    };
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  componentWillMount() {
    fetchUserProfileByID(this.props.pId)
      .then(json => {
        this.setState({
          Data: json
        });
      })
      .catch(error => {
        console.error("error", error);
      });

    fetchLocations()
    .then(jsond =>{
       this.setState({
        Locations:jsond
       });
    }).catch(error => {
      console.error("error", error);
    });

    fetchProfessional()
    .then(jsond =>{
      this.setState({
        Professional:jsond
      });
   }).catch(error => {
    console.error("error", error);
  });

  fetchUniversity()
  .then(jsond =>{
    this.setState({
      University:jsond
    });
 }).catch(error => {
  console.error("error", error);
});

fetchCompanies()
.then(jsond =>{
  this.setState({
    Companies:jsond
  });
}).catch(error => {
console.error("error", error);
});

fetchCourses()
.then(jsond =>{
  this.setState({
    Courses:jsond
  });
}).catch(error => {
console.error("error", error);
});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  locationformatter = (locationId) => {
    const selectedLocation = this.state.Locations.filter((location) => location.id === locationId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].state : '';
  }

  Designationformatter = (professionalId) => {
    const selectedLocation = this.state.Professional.filter((location) => location.id === professionalId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Designation : '';
  }
  Experienceformatter = (professionalId) => {
    const selectedLocation = this.state.Professional.filter((location) => location.id === professionalId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Experience : '';
  }
  Packageformatter = (professionalId) => {
    const selectedLocation = this.state.Professional.filter((location) => location.id === professionalId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Package : '';
  }
  Notice_Periodformatter = (professionalId) => {
    const selectedLocation = this.state.Professional.filter((location) => location.id === professionalId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Notice_Period : '';
  }
  
  Companynameformatter = (CompanynameId) => {
    const selectedLocation = this.state.Companies.filter((location) => location.id === CompanynameId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Company_Name : '';
  }
  CompanyAddressformatter = (CompanynameId) => {
    const selectedLocation = this.state.Companies.filter((location) => location.id === CompanynameId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].CompanyAddress : '';
  }
  CompanyEmail = (CompanynameId) => {
    const selectedLocation = this.state.Companies.filter((location) => location.id === CompanynameId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].CompanyEmail : '';
  }
  CompanyMobileformatter = (CompanynameId) => {
    const selectedLocation = this.state.Companies.filter((location) => location.id === CompanynameId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].CompanyContact : '';
  }
  CompanyWebformatter= (CompanynameId) => {
    const selectedLocation = this.state.Companies.filter((location) => location.id === CompanynameId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Companywebsite  : '';
  }
  
  Universityformatter= (Duniversity1Id) => {
    const selectedLocation = this.state.University.filter((location) => location.id === Duniversity1Id);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].College_Name  : '';
  }
  
  CourseNameformatter= (CoursenameId) => {
    const selectedLocation = this.state.Courses.filter((location) => location.id === CoursenameId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Course_Name  : '';
  }
  Specificationformatter= (SpecificationId) => {
    const selectedLocation = this.state.Courses.filter((location) => location.id === SpecificationId);
    // console.log(selectedLocation[0].state);
    return selectedLocation.length ? selectedLocation[0].Specification  : '';
  }
  UniversityAddressformatter= (Duniversity1Id) => {
    const selectedLocation = this.state.University.filter((location) => location.id === Duniversity1Id);
    return selectedLocation.length ? selectedLocation[0].UniversityAddress  : '';
  }
  Universitywebsiteformatter= (Duniversity1Id) => {
    const selectedLocation = this.state.University.filter((location) => location.id === Duniversity1Id);
    return selectedLocation.length ? selectedLocation[0].Universitywebsite  : '';
  }
  render() {
    const { expanded,Data } = this.state;
    const { classes}  = this.props;
    return (
      <div>
        <Tooltip title="User Profile">
          <IconButton aria-label="User Profile" onClick={this.handleClickOpen}>
            <Avatar />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <div>
    <GridContainer>    
        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <ExpansionPanel
          square
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
        
          <ExpansionPanelSummary>
          <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
              
              <h3>Personal</h3>
            </CardHeader>
            </GridItem>
          </ExpansionPanelSummary>
          <CardBody>
           <ListItem >
           <ListItemText
          primary={  <Typography component="span" className={classes.inline} color="textPrimary">
          {Data.First_Name} {Data.Last_Name} 
          </Typography>}
          secondary={Data.About}         
          />
          </ListItem>
          <ListItem >
          <GridItem xs={6} md={6} sm={6} >
           <ListItemText 
           primary ="Gmail"
           secondary ={Data.Email_id}
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >
           <ListItemText 
           primary ="Birthday"
            secondary ={moment(Data.dob).format(
            "DD/MM/YYYY"
          )}
           />
           </GridItem>
           </ListItem>

           <ListItem>
             {/* <GridContainer xs={12} md={12} sm={12}> */}
             <GridItem xs={6} md={6} sm={6} >
           <ListItemText 

           primary ="Age"
           secondary ={Data.Age}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >
           <ListItemText 
           primary ="Gender"
           secondary ={Data.Gender}  
           />
           </GridItem>           
           {/* </GridContainer> */}
             </ListItem>
             <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary =" Mobile"
           secondary ={Data.Mobile_number}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Marital Status"
           secondary ={Data.Marital_Status}  
           />
           </GridItem>
             </ListItem>
             <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Permanent Address1"
           secondary ={Data.Permanent_Address1}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Permanent Location1"
           secondary ={this.locationformatter(Data.Permanentlocation1Id)}  
           />
           </GridItem>
             </ListItem>

               <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Permanent Address2"
           secondary ={Data.Permanent_Address2}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Permanent Location2"
           secondary ={this.locationformatter(Data.Permanentlocation2Id)}  
           />
           </GridItem>
             </ListItem>

             <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Correspondence Address1"
           secondary ={Data.Correspondence_Address1}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Corrrepondence Location1"
           secondary ={this.locationformatter(Data.Corrrepondencelocation1Id)}  
           />
           </GridItem>
             </ListItem>

               <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Correspondence Address2"
           secondary ={Data.Correspondence_Address2}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary =" Corrrepondence Location2"
           secondary ={this.locationformatter(Data.Corrrepondencelocation2Id)}  
           />
           </GridItem>
             </ListItem>


              
            <Typography>
              This is All about the Profile page of {Data.First_Name} for see the list of Education list open the below the Card 
            </Typography>
             <br/>
          </CardBody>
        </ExpansionPanel>
        </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <ExpansionPanel
          square
          expanded={expanded === 'panel2'}
          onChange={this.handleChange('panel2')}
        >        
          <ExpansionPanelSummary>
          <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">             
              <h3>Professional</h3>
            </CardHeader>
            </GridItem>
          </ExpansionPanelSummary>
          <CardBody>
           <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
          primary ="Designation" 
           secondary ={this.Designationformatter(Data.professionalId)}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary =" Experience" 
           secondary ={this.Experienceformatter(Data.professionalId)}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
          primary ="Package" 
           secondary ={this.Packageformatter(Data.professionalId)}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Notice_Period" 
           secondary ={this.Notice_Periodformatter(Data.professionalId)}  
           />
           </GridItem>
             </ListItem>
            
            {/* <Typography>
              This is All about the Profile page of {Data.First_Name} for see the list of Education list open the below the Card 
            </Typography> */}
             <br/>
          </CardBody>
        </ExpansionPanel>
        </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <ExpansionPanel
          square
          expanded={expanded === 'panel3'}
          onChange={this.handleChange('panel3')}
        >        
          <ExpansionPanelSummary>
          <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">             
              <h3>Company</h3>
            </CardHeader>
            </GridItem>
          </ExpansionPanelSummary>
          <CardBody>
           <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
          primary ="Company Name" 
           secondary ={this.Companynameformatter(Data.CompanynameId)}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >
           <ListItemText 
           primary ="Company Location" 
           secondary ={this.locationformatter(Data.CompanylocationId)}  
           />
           </GridItem>
           </ListItem>
           <ListItem>
           <GridItem xs={6} md={6} sm={6} >
            
           <ListItemText 
          primary ="Company Mobile" 
           secondary ={this.CompanyMobileformatter(Data.CompanynameId)}  
           />
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Company Email" 
           secondary ={this.CompanyEmail(Data.CompanynameId)} 
           />
           </GridItem>
             </ListItem>
             <ListItem>
               <GridItem xs={6} md={6} sm={6}>
               <ListItemText 
          primary ="Company Address" 
           secondary ={this.CompanyAddressformatter(Data.CompanynameId)}  
           />
               </GridItem>
           
               <GridItem xs={6} md={6} sm={6}>
               <ListItemText 
          primary ="Company Address" 
           secondary ={this.CompanyWebformatter(Data.CompanynameId)}  
           />
               </GridItem>
             </ListItem>
             
            {/* <Typography>
              This is All about the Profile page of {Data.First_Name} for see the list of Education list open the below the Card 
            </Typography> */}
             <br/>
          </CardBody>
        </ExpansionPanel>
        </Card>
        </GridItem>
       {/*  <ExpansionPanel
          square
          expanded={expanded === 'panel3'}
          onChange={this.handleChange('panel3')}
        >
          <ExpansionPanelSummary>
            <Typography>Collapsible Group Item #3</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
          
        </ExpansionPanel> */}
        <GridItem xs={12} sm={12} md={12}>
        <Card>
        <ExpansionPanel
          square
          expanded={expanded === 'panel4'}
          onChange={this.handleChange('panel4')}
        >        
          <ExpansionPanelSummary>
          <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">             
              <h3>Education</h3>
            </CardHeader>
            </GridItem>
          </ExpansionPanelSummary>
          <CardBody>
          <ListItem >
           <ListItemText
          primary={  <ListItemText component="span" className={classes.inline} color="textPrimary">
          {this.Universityformatter(Data.Duniversity1Id)} 
          </ListItemText>}
          secondary={
              <Typography>
            {this.CourseNameformatter(Data.CoursenameId)},{this.Specificationformatter(Data.SpecificationId)} ,{Data.Course_Duration}
          </Typography>
          }      
          />
          </ListItem>
      
           <ListItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
          primary ="University Address" 
           secondary ={this.UniversityAddressformatter(Data.Duniversity1Id)}  
           />

           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="University website"
           secondary =  {this.Universitywebsiteformatter(Data.Duniversity1Id)}
           />
           
           </GridItem>
           </ListItem>
           <ListItem>
           <GridItem xs={6} md={6} sm={6} >
           <ListItemText 
           primary ="University Location" 
           secondary ={this.locationformatter(Data.UniversitylocationId)}  
           />
           </GridItem>
           {/* <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
          primary ="Course Name" 
           secondary ={this.CourseNameformatter(Data.CoursenameId)}  
           />
           
           </GridItem>
           <GridItem xs={6} md={6} sm={6} >

           <ListItemText 
           primary ="Specification" 
           secondary ={this.Specificationformatter(Data.SpecificationId)}  
           />
           </GridItem> */}
             </ListItem>
            
            {/* <Typography>
              This is All about the Profile page of {Data.First_Name} for see the list of Education list open the below the Card 
            </Typography> */}
             <br/>
          </CardBody>
        </ExpansionPanel>
        </Card>
        </GridItem>
        </GridContainer>
      </div>
        </Dialog>
      </div>
    );
  }
}


export default withStyles(styles) (UserView);
