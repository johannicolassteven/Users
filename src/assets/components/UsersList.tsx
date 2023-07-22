import { type User } from "../types";
interface Props {
  deleteUser : (email: string) => void
  users: User[];
  showColors : boolean;
}

export function UsersList({deleteUser,showColors, users }: Props) {
  return (
    <>
      <table>
        <thead>
          <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? "#333" : "#555"
            const color = showColors ? backgroundColor : 'transparent'
            return (
              <tr key={user.email} style={{backgroundColor : color}}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={()=> {deleteUser(user.email)}}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
