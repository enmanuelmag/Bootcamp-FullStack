import { Component, ErrorInfo } from 'react';

type State = {
  name: string;
  age: number;
};

type Props = {
  mode: 'light' | 'dark';
};

export class ClassReact extends Component<Props, State> {
  state = {
    name: 'John Doe',
    age: 25,
  };

  componentDidMount(): void {
    //Se ejecuta una vez que el componente ha sido montado
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    // Se ejecuta cada vez que el componente se actualiza
    // Ya sea por un cambio de estado o de props
  }

  componentWillUnmount(): void {
    // Se ejecuta justo antes de que el componente sea desmontado y destruido
  }

  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>,
    nextContext: any
  ): boolean {
    // Se ejecuta antes de que el componente se actualice
    // Retorna un booleano que indica si el componente debe actualizarse o no
    return true;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Se ejecuta cuando un error es lanzado en el componente
  }

  render() {
    //Renderiza el componente
    const { mode } = this.props;

    const { name, age } = this.state;

    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-2xl font-bold">Class Component</h1>

          <input
            type="text"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <input
            type="number"
            value={age}
            onChange={(e) => this.setState({ age: Number(e.target.value) })}
          />

          <span className="text-sm">Mode: {mode}</span>
        </div>
      </div>
    );
  }
}

export default ClassReact;
