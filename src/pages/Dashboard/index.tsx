import React, { useEffect, useMemo, useState } from 'react';
import Chart from 'react-google-charts';

import {
  FiMail,
  FiPhone,
  FiPhoneCall,
  FiSearch,
  FiUsers,
} from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { Client } from '../../interfaces/clients/IClient';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import mapIcon from '../../utils/mapIcon';
import {
  ChartContainer,
  Container,
  ContainerQuadro3,
  Content,
  InfoGeral,
  LimiteCredito,
  Local,
  Oportunidade,
  Vendas,
} from './styles';
import Activity from '../../components/Activity';
import { ActivityInterface } from '../../interfaces/clients/IActivity';

interface ParamsUrl {
  id: string;
}

interface OpportunitiesOptions {
  winner: number;
  open: number;
  lost: number;
  discarded: number;
}
interface FinancialOptions {
  paid: number;
  expired: number;
  overcome: number;
}

const Dashboard: React.FC = () => {
  const [client, setClient] = useState<Client>();
  const [activities, setActivities] = useState<ActivityInterface[]>();
  const [dataInput, setDataInput] = useState<string>('');
  const { id } = useParams<ParamsUrl>();

  //carrega dados do cliente ao abrir a pagina
  useEffect(() => {
    //verifica se existe parametro na url, se nao usar como padrao id = 1
    let param = !id ? 1 : id;

    async function loadClient(): Promise<void> {
      try {
        const { data } = await api.get<Client>(`clients/${param}`);
        if (!data) {
          alert(`Erro de requisição, tente novamente mais tarde`);
          return;
        }
        setClient(data);
      } catch (err) {
        alert(`Erro de requisição ${err.message}`);
      }
    }
    loadClient();
  }, []);
  //carrega dados de atividades do cliente
  useEffect(() => {
    //verifica se existe parametro na url, se nao usar como padrao id = 1
    let param = !id ? 1 : id;

    async function loadActivities(): Promise<void> {
      try {
        //utiliza o datainput para fazer requisicao quando é alterado o input de pesquisa
        const { data } = await api.get<ActivityInterface[]>(
          `activities?id_cliente=${param}&title_like=${dataInput}`,
        );
        if (!data) {
          alert(`Erro de requisição, tente novamente mais tarde`);
          return;
        }
        setActivities(data);
      } catch (err) {
        alert(`Erro de requisição ${err.message}`);
      }
    }
    loadActivities();
  }, [dataInput]);

  //Calcula o total de oportunidades
  const calcOpportunities = useMemo(() => {
    if (!client) return 0;
    const total = client.opportunities.reduce((accumulator, opportunity) => {
      return accumulator + opportunity.quantity;
    }, 0);
    return total;
  }, [client]);
  //calcula os valores e divide por tipos das oportunidades
  const calcOpportunitiesValues = useMemo<OpportunitiesOptions>(() => {
    if (!client) return {} as OpportunitiesOptions;

    const winner = client.opportunities.reduce((accumulator, op) => {
      const value = op.type === 'winner' ? op.value : 0;
      return accumulator + value;
    }, 0);
    const open = client.opportunities.reduce((accumulator, op) => {
      const value = op.type === 'open' ? op.value : 0;
      return accumulator + value;
    }, 0);
    const lost = client.opportunities.reduce((accumulator, op) => {
      const value = op.type === 'lost' ? op.value : 0;
      return accumulator + value;
    }, 0);
    const discarded = client.opportunities.reduce((accumulator, op) => {
      const value = op.type === 'discarded' ? op.value : 0;
      return accumulator + value;
    }, 0);

    const data = { winner, lost, discarded, open } as OpportunitiesOptions;
    return data;
  }, [client]);
  //calcula e divide os valores financeiros
  const calcFinancial = useMemo<FinancialOptions>(() => {
    if (!client) return {} as FinancialOptions;
    const paid = client.financial.reduce((accumulator, f) => {
      const value = f.type === 'paid' ? f.value : 0;
      return accumulator + value;
    }, 0);
    const expired = client.financial.reduce((accumulator, f) => {
      const value = f.type === 'expired' ? f.value : 0;
      return accumulator + value;
    }, 0);
    const overcome = client.financial.reduce((accumulator, f) => {
      const value = f.type === 'overcome' ? f.value : 0;
      return accumulator + value;
    }, 0);

    const data = {
      paid,
      expired,
      overcome,
    } as FinancialOptions;

    return data;
  }, [client]);

  //Caso não esteja carregado retorna um loading.
  if (!client || !activities) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Header />
      <Content>
        <aside className="quadro1">
          <div className="box">
            <InfoGeral ativo={client.situation} className="content-box">
              <div className="title">
                <h1>Informações gerais:</h1>
              </div>
              <div className="twoItems">
                <img
                  src="https://cdn.icon-icons.com/icons2/1141/PNG/512/1486395884-account_80606.png"
                  alt="Icone"
                />
                <section>
                  <p>{client.name}</p>
                  <p>{client.company}</p>
                  <p className="situation">
                    {client.situation === 1 ? 'Ativo' : 'Inativo'}
                  </p>
                </section>
              </div>

              <div className="twoItemsIcon">
                <FiPhone size={18} color="black" />
                <p>{client.cellphone}</p>
              </div>
              <div className="twoItemsIcon">
                <FiPhoneCall size={18} color="black" />
                <p>{client.phone}</p>
              </div>
              <div className="twoItemsIcon">
                <FiMail size={18} color="black" />
                <p>{client.email}</p>
              </div>
            </InfoGeral>
          </div>
          <div className="box">
            <Oportunidade>
              <div className="title">
                <h1>{`Oportunidades(${calcOpportunities})`}</h1>
              </div>
              <div className="content">
                <div className="twoItems">
                  <Card
                    value={String(
                      client.opportunities.find(o => o.type === 'winner')
                        ?.quantity,
                    )}
                    color="green"
                  />
                  <section>
                    <p>Ganhas</p>
                    <span>{formatValue(calcOpportunitiesValues.winner)}</span>
                  </section>
                </div>
                <div className="twoItems">
                  <Card
                    value={String(
                      client.opportunities.find(o => o.type === 'lost')
                        ?.quantity,
                    )}
                    color="red"
                  />
                  <section>
                    <p>Perdidas</p>
                    <span>{formatValue(calcOpportunitiesValues.lost)}</span>
                  </section>
                </div>
              </div>
              <div className="content">
                <div className="twoItems">
                  <Card
                    value={String(
                      client.opportunities.find(o => o.type === 'open')
                        ?.quantity,
                    )}
                    color="blue"
                  />
                  <section>
                    <p>Abertas</p>
                    <span>{formatValue(calcOpportunitiesValues.open)}</span>
                  </section>
                </div>
                <div className="twoItems">
                  <Card
                    value={String(
                      client.opportunities.find(o => o.type === 'discarded')
                        ?.quantity,
                    )}
                    color="black"
                  />
                  <section>
                    <p>Descartadas</p>
                    <span>
                      {formatValue(calcOpportunitiesValues.discarded)}
                    </span>
                  </section>
                </div>
              </div>
            </Oportunidade>
          </div>
          <div className="box">
            <Vendas>
              <div className="title">
                <h1>Vendas</h1>
              </div>
              <Chart
                height={'90%'}
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Trimestre', 'Vendas'],
                  ['0', 0],
                  ['1ª', `${client.sales.find(s => s.quarter === 1)?.value}`],
                  ['2ª', `${client.sales.find(s => s.quarter === 2)?.value}`],
                  ['3ª', `${client.sales.find(s => s.quarter === 3)?.value}`],
                  ['4ª', `${client.sales.find(s => s.quarter === 4)?.value}`],
                ]}
                options={{
                  hAxis: {
                    title: 'Trimestres',
                    titleTextStyle: { color: '#333' },
                  },
                  vAxis: { title: 'Valores', minValue: 0 },
                  chartArea: { width: '65%', height: '70%' },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </Vendas>
          </div>
        </aside>
        <section className="quadro2">
          <div className="box">
            <Local>
              <div className="title">
                <h1>{`Local: ${client.address}, ${client.number} ${client.city} ${client.uf}`}</h1>
              </div>
              <div className="map">
                <Map
                  center={[client.coords.latitude, client.coords.longitude]}
                  zoom={15}
                  style={{
                    width: '100%',
                    height: 182,
                    marginRight: 10,
                    borderRadius: 10,
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[client.coords.latitude, client.coords.longitude]}
                    icon={mapIcon}
                  />
                </Map>
              </div>
            </Local>
          </div>
          <div className="box">
            <LimiteCredito>
              <div className="title">
                <h1>Limite de Crédito</h1>
              </div>
              <div className="content">
                <section>
                  <p>{formatValue(client.credit.granted)}</p>
                  <span>Concedido</span>
                </section>
                <section>
                  <p className="available">
                    {formatValue(client.credit.available)}
                  </p>
                  <span>Disponivel</span>
                </section>
              </div>
            </LimiteCredito>
          </div>
          <div className="box">
            <div className="title">
              <h1>Titulos:</h1>
            </div>
            <ChartContainer>
              <Chart
                chartType="PieChart"
                height={'90%'}
                options={{ title: 'Titulos Financeiros' }}
                data={[
                  ['Titulos', 'Quantidade'],
                  ['Pagos', calcFinancial.paid],
                  ['Vencidos', calcFinancial.expired],
                  ['À vencer', calcFinancial.overcome],
                ]}
              />
            </ChartContainer>
          </div>
        </section>
        <aside className="quadro3">
          <ContainerQuadro3>
            <div className="title">
              <h1>Atividades:</h1>
            </div>
            <div className="content">
              <div className="barra-busca">
                <input
                  placeholder="Pesquisa"
                  onChange={e => setDataInput(e.target.value)}
                  value={dataInput}
                />
                <FiSearch size={18} color="black" className="icon" />
              </div>
              <div className="list-view">
                <div className="barra-totais">
                  <div className="twoItems">
                    <Card
                      color="black"
                      value={String(activities.length)}
                      className="card"
                    />
                    <p className="p">Total</p>
                  </div>
                  <div className="twoItems">
                    <Card
                      color="red"
                      value={String(
                        activities.filter(a => a.status === 'overdue').length,
                      )}
                      className="card"
                    />
                    <p>Em Atraso</p>
                  </div>
                  <div className="twoItems">
                    <Card
                      color="blue"
                      value={String(
                        activities.filter(a => a.status === 'progress').length,
                      )}
                      className="card"
                    />
                    <p>Em Andamento</p>
                  </div>
                  <div className="twoItems">
                    <Card
                      color="orange"
                      value={String(
                        activities.filter(a => a.status === 'provided').length,
                      )}
                      className="card"
                    />
                    <p>Previstas</p>
                  </div>
                  <div className="twoItems">
                    <Card
                      color="green"
                      value={String(
                        activities.filter(a => a.status === 'finish').length,
                      )}
                      className="card"
                    />
                    <p>Concluidas</p>
                  </div>
                </div>
                <div className="list">
                  <div>
                    <Activity color="red" value="Atividades em atraso" />
                    {activities
                      .filter(a => a.status === 'overdue')
                      .map(activity => {
                        if (activity.type === 'call') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiPhone size={15} color="red" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'email') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiMail size={15} color="red" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'meeting') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiUsers size={15} color="red" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                      })}
                  </div>
                  <div>
                    <Activity color="orange" value="Atividades previstas" />
                    {activities
                      .filter(a => a.status === 'provided')
                      .map(activity => {
                        if (activity.type === 'call') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiPhone size={15} color="orange" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'email') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiMail size={15} color="orange" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'meeting') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiUsers size={15} color="orange" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                      })}
                  </div>
                  <div>
                    <Activity color="green" value="Atividades concluidas" />
                    {activities
                      .filter(a => a.status === 'finish')
                      .map(activity => {
                        if (activity.type === 'call') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiPhone size={15} color="green" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'email') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiMail size={15} color="green" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'meeting') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiUsers size={15} color="green" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                      })}
                  </div>
                  <div>
                    <Activity color="blue" value="Atividades em andamento" />
                    {activities
                      .filter(a => a.status === 'progress')
                      .map(activity => {
                        if (activity.type === 'call') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiPhone size={15} color="blue" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'email') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiMail size={15} color="blue" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                        if (activity.type === 'meeting') {
                          return (
                            <div className="twoItems" key={activity.id}>
                              <FiUsers size={15} color="blue" />
                              <section>
                                <h1>{activity.title}</h1>
                                <p>{activity.contact}</p>
                                <span>{activity.date}</span>
                              </section>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </div>
          </ContainerQuadro3>
        </aside>
      </Content>
      <footer></footer>
    </Container>
  );
};

export default Dashboard;
