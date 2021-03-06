import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import HeaderWithActions from '../../components/HeaderWithActions';
import { ListUsers } from '../../graphql';
import { InviteUserDialog } from './InviteUserDialog';

const listUsersQuery = gql`
  query ListUsers {
    users {
      id
      name
      email
      avatar {
        url
      }
      roles
    }
  }
`;

const styles = (theme: Theme) => ({
  usernameCell: {
    display: 'flex',
  },
  avatar: {
    height: 16,
    width: 16,
    marginRight: theme.spacing.unit * 2,
  },
});

const List: React.SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <React.Fragment>
    <HeaderWithActions actions={<InviteUserDialog />} title="Users" />
    <Query query={listUsersQuery}>
      {({ data }: QueryResult<ListUsers>) => (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          {data &&
            data.users && (
              <TableBody>
                {data.users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className={classes.usernameCell}>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatar.url || undefined}
                        />
                        <div>{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roles.join(', ')}</TableCell>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>Edit</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
        </Table>
      )}
    </Query>
  </React.Fragment>
);

export default withStyles(styles)(List);
