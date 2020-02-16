import React from 'react' 
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Home from './components/static/Home'
import Login from './components/users/Login'
import Register from './components/users/Register'
import Logout from './components/users/Logout'

import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/Show'
import CustomerEdit from './components/customers/Edit'

import DepartmentList from './components/departments/List'

import EmployeeList from './components/employees/List'
import EmployeeNew from './components/employees/New'

import TicketList from './components/tickets/List'
import TicketNew from './components/tickets/New'


function App(props) {
    return (
        <BrowserRouter>
            <div>
                <h1>Ticket Master</h1>
                <Link to="/">Home</Link>
                {
                    localStorage.getItem('authToken') ? (
                        <div>
                            <Link to="/users/account">Account</Link>
                            <Link to="/customers">Customers</Link>
                            <Link to="/departments">Departments</Link>
                            <Link to="/employees">Employees</Link>
                            <Link to="/tickets">Tickets</Link>
                            <Link to="/users/logout">Logout</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/users/login">Login</Link>
                            <Link to="/users/register">Register</Link>
                        </div>
                    )
                }
                <Switch>
                    <Route path="/" component={Home} exact={true} />

                    <Route path="/users/login" component={Login} />
                    <Route path="/users/register" component={Register} />
                    <Route path="/users/logout" component={Logout} />

                    <Route path="/customers" component={CustomerList} exact />
                    <Route path="/customers/new" component={CustomerNew} />
                    <Route path="/customers/edit/:id" component={CustomerEdit} />
                    <Route path="/customers/:id" component={CustomerShow} />

                    <Route path="/departments" component={DepartmentList} />

                    <Route path="/employees" component={EmployeeList} exact/>
                    <Route path="/employees/new" component={EmployeeNew} />

                    <Route path="/tickets" component={TicketList} exact/>
                    <Route path="/ticket/new" component={TicketNew} />
                </Switch>
                
            </div>
        </BrowserRouter>
    )
}
export default App