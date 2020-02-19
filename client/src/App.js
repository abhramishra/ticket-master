import React from 'react' 
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Nav, NavItem, NavLink, Navbar, NavbarText } from 'reactstrap'

import Home from './components/static/Home'
import Login from './components/users/Login'
import Register from './components/users/Register'
import Logout from './components/users/Logout'

import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'

import DepartmentList from './components/departments/List'
import DepartmentShow from './components/departments/Show'
import DepartmentEdit from './components/departments/Edit'

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/New'
import EmployeeShow from './components/employees/Show'
import EmployeeEdit from './components/employees/Edit'

import TicketList from './components/tickets/List'
import TicketNew from './components/tickets/New'
import TicketShow from './components/tickets/Show'
import TicketEdit from './components/tickets/Edit'


function App(props) {
    return (
        <BrowserRouter>
            <div>
                <div className="row bg-light">
                    <div className="col-md-3">
                    <h1 style={{ color: 'gray' }}>Ticket Master</h1>
                    </div>
                    <div className="col-md-9 text-right">
                    {
                        localStorage.getItem('authToken') ? (
                            <Nav className="float-right">
                                <NavItem>
                                    <NavLink><Link to="/">Home</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/users/account">Account</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/customers">Customers</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/departments">Departments</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink><Link to="/employees">Employees</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink><Link to="/tickets">Tickets</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink><Link to="/users/logout">Logout</Link></NavLink>
                                </NavItem>

                            </Nav>
                        ) : (
                            <Nav className="float-right">
                                <NavItem>
                                    <NavLink><Link to="/">Home</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/users/login">Login</Link></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink><Link to="/users/register">Register</Link></NavLink>
                                </NavItem>
                            </Nav>
                        )
                    }
                    </div>
                </div>
                    

                <Switch>
                    <Route path="/" component={Home} exact={true} />

                    <Route path="/users/login" component={Login} />
                    <Route path="/users/register" component={Register} />
                    <Route path="/users/logout" component={Logout} />

                    <Route path="/customers" component={CustomerList} exact />
                    <Route path="/customers/new" component={CustomerNew} />
                    <Route path="/customers/edit/:id" component={CustomerEdit} />
                    <Route path="/customers/:id" component={CustomerShow} />

                    <Route path="/departments" component={DepartmentList} exact />
                    <Route path="/departments/edit/:id" component={DepartmentEdit} />
                    <Route path="/departments/:id" component={DepartmentShow} />

                    <Route path="/employees" component={EmployeeList} exact/>
                    <Route path="/employees/new" component={EmployeeNew} />
                    <Route path="/employees/edit/:id" component={EmployeeEdit} />
                    <Route path="/employees/:id" component={EmployeeShow} />

                    <Route path="/tickets" component={TicketList} exact/>
                    <Route path="/tickets/new" component={TicketNew} />
                    <Route path="/tickets/edit/:id" component={TicketEdit} />
                    <Route path="/tickets/:id" component={TicketShow} />
                </Switch>                
                
            </div>
        </BrowserRouter>
    )
}
export default App